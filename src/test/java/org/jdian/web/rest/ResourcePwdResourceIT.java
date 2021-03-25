package org.jdian.web.rest;

import org.jdian.KeybossApp;
import org.jdian.config.TestSecurityConfiguration;
import org.jdian.domain.ResourcePwd;
import org.jdian.repository.ResourcePwdRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ResourcePwdResource} REST controller.
 */
@SpringBootTest(classes = { KeybossApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class ResourcePwdResourceIT {

    private static final String DEFAULT_PWD = "AAAAAAAAAA";
    private static final String UPDATED_PWD = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ResourcePwdRepository resourcePwdRepository;

    @Autowired
    private MockMvc restResourcePwdMockMvc;

    private ResourcePwd resourcePwd;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ResourcePwd createEntity() {
        ResourcePwd resourcePwd = new ResourcePwd()
            .pwd(DEFAULT_PWD)
            .createdAt(DEFAULT_CREATED_AT);
        return resourcePwd;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ResourcePwd createUpdatedEntity() {
        ResourcePwd resourcePwd = new ResourcePwd()
            .pwd(UPDATED_PWD)
            .createdAt(UPDATED_CREATED_AT);
        return resourcePwd;
    }

    @BeforeEach
    public void initTest() {
        resourcePwdRepository.deleteAll();
        resourcePwd = createEntity();
    }

    @Test
    public void createResourcePwd() throws Exception {
        int databaseSizeBeforeCreate = resourcePwdRepository.findAll().size();
        // Create the ResourcePwd
        restResourcePwdMockMvc.perform(post("/api/resource-pwds").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resourcePwd)))
            .andExpect(status().isCreated());

        // Validate the ResourcePwd in the database
        List<ResourcePwd> resourcePwdList = resourcePwdRepository.findAll();
        assertThat(resourcePwdList).hasSize(databaseSizeBeforeCreate + 1);
        ResourcePwd testResourcePwd = resourcePwdList.get(resourcePwdList.size() - 1);
        assertThat(testResourcePwd.getPwd()).isEqualTo(DEFAULT_PWD);
        assertThat(testResourcePwd.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
    }

    @Test
    public void createResourcePwdWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = resourcePwdRepository.findAll().size();

        // Create the ResourcePwd with an existing ID
        resourcePwd.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restResourcePwdMockMvc.perform(post("/api/resource-pwds").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resourcePwd)))
            .andExpect(status().isBadRequest());

        // Validate the ResourcePwd in the database
        List<ResourcePwd> resourcePwdList = resourcePwdRepository.findAll();
        assertThat(resourcePwdList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkPwdIsRequired() throws Exception {
        int databaseSizeBeforeTest = resourcePwdRepository.findAll().size();
        // set the field null
        resourcePwd.setPwd(null);

        // Create the ResourcePwd, which fails.


        restResourcePwdMockMvc.perform(post("/api/resource-pwds").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resourcePwd)))
            .andExpect(status().isBadRequest());

        List<ResourcePwd> resourcePwdList = resourcePwdRepository.findAll();
        assertThat(resourcePwdList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCreatedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = resourcePwdRepository.findAll().size();
        // set the field null
        resourcePwd.setCreatedAt(null);

        // Create the ResourcePwd, which fails.


        restResourcePwdMockMvc.perform(post("/api/resource-pwds").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resourcePwd)))
            .andExpect(status().isBadRequest());

        List<ResourcePwd> resourcePwdList = resourcePwdRepository.findAll();
        assertThat(resourcePwdList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllResourcePwds() throws Exception {
        // Initialize the database
        resourcePwdRepository.save(resourcePwd);

        // Get all the resourcePwdList
        restResourcePwdMockMvc.perform(get("/api/resource-pwds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resourcePwd.getId())))
            .andExpect(jsonPath("$.[*].pwd").value(hasItem(DEFAULT_PWD)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())));
    }
    
    @Test
    public void getResourcePwd() throws Exception {
        // Initialize the database
        resourcePwdRepository.save(resourcePwd);

        // Get the resourcePwd
        restResourcePwdMockMvc.perform(get("/api/resource-pwds/{id}", resourcePwd.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(resourcePwd.getId()))
            .andExpect(jsonPath("$.pwd").value(DEFAULT_PWD))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()));
    }
    @Test
    public void getNonExistingResourcePwd() throws Exception {
        // Get the resourcePwd
        restResourcePwdMockMvc.perform(get("/api/resource-pwds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateResourcePwd() throws Exception {
        // Initialize the database
        resourcePwdRepository.save(resourcePwd);

        int databaseSizeBeforeUpdate = resourcePwdRepository.findAll().size();

        // Update the resourcePwd
        ResourcePwd updatedResourcePwd = resourcePwdRepository.findById(resourcePwd.getId()).get();
        updatedResourcePwd
            .pwd(UPDATED_PWD)
            .createdAt(UPDATED_CREATED_AT);

        restResourcePwdMockMvc.perform(put("/api/resource-pwds").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedResourcePwd)))
            .andExpect(status().isOk());

        // Validate the ResourcePwd in the database
        List<ResourcePwd> resourcePwdList = resourcePwdRepository.findAll();
        assertThat(resourcePwdList).hasSize(databaseSizeBeforeUpdate);
        ResourcePwd testResourcePwd = resourcePwdList.get(resourcePwdList.size() - 1);
        assertThat(testResourcePwd.getPwd()).isEqualTo(UPDATED_PWD);
        assertThat(testResourcePwd.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
    }

    @Test
    public void updateNonExistingResourcePwd() throws Exception {
        int databaseSizeBeforeUpdate = resourcePwdRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restResourcePwdMockMvc.perform(put("/api/resource-pwds").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resourcePwd)))
            .andExpect(status().isBadRequest());

        // Validate the ResourcePwd in the database
        List<ResourcePwd> resourcePwdList = resourcePwdRepository.findAll();
        assertThat(resourcePwdList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteResourcePwd() throws Exception {
        // Initialize the database
        resourcePwdRepository.save(resourcePwd);

        int databaseSizeBeforeDelete = resourcePwdRepository.findAll().size();

        // Delete the resourcePwd
        restResourcePwdMockMvc.perform(delete("/api/resource-pwds/{id}", resourcePwd.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ResourcePwd> resourcePwdList = resourcePwdRepository.findAll();
        assertThat(resourcePwdList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
