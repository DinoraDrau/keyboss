package org.jdian.repository;

import org.jdian.domain.PwdPattern;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the PwdPattern entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PwdPatternRepository extends MongoRepository<PwdPattern, String> {
}
