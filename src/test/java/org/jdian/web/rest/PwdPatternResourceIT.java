package org.jdian.web.rest;

import org.jdian.KeybossApp;
import org.jdian.config.TestSecurityConfiguration;
import org.jdian.domain.PwdPattern;
import org.jdian.repository.PwdPatternRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PwdPatternResource} REST controller.
 */
@SpringBootTest(classes = { KeybossApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class PwdPatternResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PWD_PATTERN = "AAAAAAAAAA";
    private static final String UPDATED_PWD_PATTERN = "BBBBBBBBBB";

    @Autowired
    private PwdPatternRepository pwdPatternRepository;

    @Autowired
    private MockMvc restPwdPatternMockMvc;

    private PwdPattern pwdPattern;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PwdPattern createEntity() {
        PwdPattern pwdPattern = new PwdPattern()
            .name(DEFAULT_NAME)
            .pwdPattern(DEFAULT_PWD_PATTERN);
        return pwdPattern;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PwdPattern createUpdatedEntity() {
        PwdPattern pwdPattern = new PwdPattern()
            .name(UPDATED_NAME)
            .pwdPattern(UPDATED_PWD_PATTERN);
        return pwdPattern;
    }

    @BeforeEach
    public void initTest() {
        pwdPatternRepository.deleteAll();
        pwdPattern = createEntity();
    }

    @Test
    public void createPwdPattern() throws Exception {
        int databaseSizeBeforeCreate = pwdPatternRepository.findAll().size();
        // Create the PwdPattern
        restPwdPatternMockMvc.perform(post("/api/pwd-patterns").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pwdPattern)))
            .andExpect(status().isCreated());

        // Validate the PwdPattern in the database
        List<PwdPattern> pwdPatternList = pwdPatternRepository.findAll();
        assertThat(pwdPatternList).hasSize(databaseSizeBeforeCreate + 1);
        PwdPattern testPwdPattern = pwdPatternList.get(pwdPatternList.size() - 1);
        assertThat(testPwdPattern.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPwdPattern.getPwdPattern()).isEqualTo(DEFAULT_PWD_PATTERN);
    }

    @Test
    public void createPwdPatternWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pwdPatternRepository.findAll().size();

        // Create the PwdPattern with an existing ID
        pwdPattern.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restPwdPatternMockMvc.perform(post("/api/pwd-patterns").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pwdPattern)))
            .andExpect(status().isBadRequest());

        // Validate the PwdPattern in the database
        List<PwdPattern> pwdPatternList = pwdPatternRepository.findAll();
        assertThat(pwdPatternList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = pwdPatternRepository.findAll().size();
        // set the field null
        pwdPattern.setName(null);

        // Create the PwdPattern, which fails.


        restPwdPatternMockMvc.perform(post("/api/pwd-patterns").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pwdPattern)))
            .andExpect(status().isBadRequest());

        List<PwdPattern> pwdPatternList = pwdPatternRepository.findAll();
        assertThat(pwdPatternList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkPwdPatternIsRequired() throws Exception {
        int databaseSizeBeforeTest = pwdPatternRepository.findAll().size();
        // set the field null
        pwdPattern.setPwdPattern(null);

        // Create the PwdPattern, which fails.


        restPwdPatternMockMvc.perform(post("/api/pwd-patterns").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pwdPattern)))
            .andExpect(status().isBadRequest());

        List<PwdPattern> pwdPatternList = pwdPatternRepository.findAll();
        assertThat(pwdPatternList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllPwdPatterns() throws Exception {
        // Initialize the database
        pwdPatternRepository.save(pwdPattern);

        // Get all the pwdPatternList
        restPwdPatternMockMvc.perform(get("/api/pwd-patterns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pwdPattern.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].pwdPattern").value(hasItem(DEFAULT_PWD_PATTERN)));
    }
    
    @Test
    public void getPwdPattern() throws Exception {
        // Initialize the database
        pwdPatternRepository.save(pwdPattern);

        // Get the pwdPattern
        restPwdPatternMockMvc.perform(get("/api/pwd-patterns/{id}", pwdPattern.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pwdPattern.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.pwdPattern").value(DEFAULT_PWD_PATTERN));
    }
    @Test
    public void getNonExistingPwdPattern() throws Exception {
        // Get the pwdPattern
        restPwdPatternMockMvc.perform(get("/api/pwd-patterns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updatePwdPattern() throws Exception {
        // Initialize the database
        pwdPatternRepository.save(pwdPattern);

        int databaseSizeBeforeUpdate = pwdPatternRepository.findAll().size();

        // Update the pwdPattern
        PwdPattern updatedPwdPattern = pwdPatternRepository.findById(pwdPattern.getId()).get();
        updatedPwdPattern
            .name(UPDATED_NAME)
            .pwdPattern(UPDATED_PWD_PATTERN);

        restPwdPatternMockMvc.perform(put("/api/pwd-patterns").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPwdPattern)))
            .andExpect(status().isOk());

        // Validate the PwdPattern in the database
        List<PwdPattern> pwdPatternList = pwdPatternRepository.findAll();
        assertThat(pwdPatternList).hasSize(databaseSizeBeforeUpdate);
        PwdPattern testPwdPattern = pwdPatternList.get(pwdPatternList.size() - 1);
        assertThat(testPwdPattern.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPwdPattern.getPwdPattern()).isEqualTo(UPDATED_PWD_PATTERN);
    }

    @Test
    public void updateNonExistingPwdPattern() throws Exception {
        int databaseSizeBeforeUpdate = pwdPatternRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPwdPatternMockMvc.perform(put("/api/pwd-patterns").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pwdPattern)))
            .andExpect(status().isBadRequest());

        // Validate the PwdPattern in the database
        List<PwdPattern> pwdPatternList = pwdPatternRepository.findAll();
        assertThat(pwdPatternList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deletePwdPattern() throws Exception {
        // Initialize the database
        pwdPatternRepository.save(pwdPattern);

        int databaseSizeBeforeDelete = pwdPatternRepository.findAll().size();

        // Delete the pwdPattern
        restPwdPatternMockMvc.perform(delete("/api/pwd-patterns/{id}", pwdPattern.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PwdPattern> pwdPatternList = pwdPatternRepository.findAll();
        assertThat(pwdPatternList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
