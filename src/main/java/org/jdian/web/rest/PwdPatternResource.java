package org.jdian.web.rest;

import org.jdian.domain.PwdPattern;
import org.jdian.repository.PwdPatternRepository;
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
 * REST controller for managing {@link org.jdian.domain.PwdPattern}.
 */
@RestController
@RequestMapping("/api")
public class PwdPatternResource {

    private final Logger log = LoggerFactory.getLogger(PwdPatternResource.class);

    private static final String ENTITY_NAME = "pwdPattern";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PwdPatternRepository pwdPatternRepository;

    public PwdPatternResource(PwdPatternRepository pwdPatternRepository) {
        this.pwdPatternRepository = pwdPatternRepository;
    }

    /**
     * {@code POST  /pwd-patterns} : Create a new pwdPattern.
     *
     * @param pwdPattern the pwdPattern to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pwdPattern, or with status {@code 400 (Bad Request)} if the pwdPattern has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pwd-patterns")
    public ResponseEntity<PwdPattern> createPwdPattern(@Valid @RequestBody PwdPattern pwdPattern) throws URISyntaxException {
        log.debug("REST request to save PwdPattern : {}", pwdPattern);
        if (pwdPattern.getId() != null) {
            throw new BadRequestAlertException("A new pwdPattern cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PwdPattern result = pwdPatternRepository.save(pwdPattern);
        return ResponseEntity.created(new URI("/api/pwd-patterns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /pwd-patterns} : Updates an existing pwdPattern.
     *
     * @param pwdPattern the pwdPattern to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pwdPattern,
     * or with status {@code 400 (Bad Request)} if the pwdPattern is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pwdPattern couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pwd-patterns")
    public ResponseEntity<PwdPattern> updatePwdPattern(@Valid @RequestBody PwdPattern pwdPattern) throws URISyntaxException {
        log.debug("REST request to update PwdPattern : {}", pwdPattern);
        if (pwdPattern.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PwdPattern result = pwdPatternRepository.save(pwdPattern);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pwdPattern.getId()))
            .body(result);
    }

    /**
     * {@code GET  /pwd-patterns} : get all the pwdPatterns.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pwdPatterns in body.
     */
    @GetMapping("/pwd-patterns")
    public List<PwdPattern> getAllPwdPatterns() {
        log.debug("REST request to get all PwdPatterns");
        return pwdPatternRepository.findAll();
    }

    /**
     * {@code GET  /pwd-patterns/:id} : get the "id" pwdPattern.
     *
     * @param id the id of the pwdPattern to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pwdPattern, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pwd-patterns/{id}")
    public ResponseEntity<PwdPattern> getPwdPattern(@PathVariable String id) {
        log.debug("REST request to get PwdPattern : {}", id);
        Optional<PwdPattern> pwdPattern = pwdPatternRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pwdPattern);
    }

    /**
     * {@code DELETE  /pwd-patterns/:id} : delete the "id" pwdPattern.
     *
     * @param id the id of the pwdPattern to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pwd-patterns/{id}")
    public ResponseEntity<Void> deletePwdPattern(@PathVariable String id) {
        log.debug("REST request to delete PwdPattern : {}", id);
        pwdPatternRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
