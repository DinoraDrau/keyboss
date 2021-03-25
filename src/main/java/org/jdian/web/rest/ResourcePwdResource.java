package org.jdian.web.rest;

import org.jdian.domain.ResourcePwd;
import org.jdian.repository.ResourcePwdRepository;
import org.jdian.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.jdian.domain.ResourcePwd}.
 */
@RestController
@RequestMapping("/api")
public class ResourcePwdResource {

    private final Logger log = LoggerFactory.getLogger(ResourcePwdResource.class);

    private static final String ENTITY_NAME = "resourcePwd";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ResourcePwdRepository resourcePwdRepository;

    public ResourcePwdResource(ResourcePwdRepository resourcePwdRepository) {
        this.resourcePwdRepository = resourcePwdRepository;
    }

    /**
     * {@code POST  /resource-pwds} : Create a new resourcePwd.
     *
     * @param resourcePwd the resourcePwd to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new resourcePwd, or with status {@code 400 (Bad Request)} if the resourcePwd has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/resource-pwds")
    public ResponseEntity<ResourcePwd> createResourcePwd(@Valid @RequestBody ResourcePwd resourcePwd) throws URISyntaxException {
        log.debug("REST request to save ResourcePwd : {}", resourcePwd);
        if (resourcePwd.getId() != null) {
            throw new BadRequestAlertException("A new resourcePwd cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ResourcePwd result = resourcePwdRepository.save(resourcePwd);
        return ResponseEntity.created(new URI("/api/resource-pwds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /resource-pwds} : Updates an existing resourcePwd.
     *
     * @param resourcePwd the resourcePwd to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated resourcePwd,
     * or with status {@code 400 (Bad Request)} if the resourcePwd is not valid,
     * or with status {@code 500 (Internal Server Error)} if the resourcePwd couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/resource-pwds")
    public ResponseEntity<ResourcePwd> updateResourcePwd(@Valid @RequestBody ResourcePwd resourcePwd) throws URISyntaxException {
        log.debug("REST request to update ResourcePwd : {}", resourcePwd);
        if (resourcePwd.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ResourcePwd result = resourcePwdRepository.save(resourcePwd);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, resourcePwd.getId()))
            .body(result);
    }

    /**
     * {@code GET  /resource-pwds} : get all the resourcePwds.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of resourcePwds in body.
     */
    @GetMapping("/resource-pwds")
    public List<ResourcePwd> getAllResourcePwds() {
        log.debug("REST request to get all ResourcePwds");
        return resourcePwdRepository.findAll();
    }

    /**
     * {@code GET  /resource-pwds/:id} : get the "id" resourcePwd.
     *
     * @param id the id of the resourcePwd to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the resourcePwd, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/resource-pwds/{id}")
    public ResponseEntity<ResourcePwd> getResourcePwd(@PathVariable String id) {
        log.debug("REST request to get ResourcePwd : {}", id);
        Optional<ResourcePwd> resourcePwd = resourcePwdRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(resourcePwd);
    }

    /**
     * {@code DELETE  /resource-pwds/:id} : delete the "id" resourcePwd.
     *
     * @param id the id of the resourcePwd to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/resource-pwds/{id}")
    public ResponseEntity<Void> deleteResourcePwd(@PathVariable String id) {
        log.debug("REST request to delete ResourcePwd : {}", id);
        resourcePwdRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
