package org.jdian.repository;

import org.jdian.domain.ResourcePwd;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ResourcePwd entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResourcePwdRepository extends MongoRepository<ResourcePwd, String> {
}
