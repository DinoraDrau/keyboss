package org.jdian.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A ResourcePwd.
 */
@Document(collection = "resource_pwd")
public class ResourcePwd implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("pwd")
    private String pwd;

    @NotNull
    @Field("created_at")
    private Instant createdAt;

    @DBRef
    @Field("resource")
    @JsonIgnoreProperties(value = "resourcePwds", allowSetters = true)
    private Resource resource;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPwd() {
        return pwd;
    }

    public ResourcePwd pwd(String pwd) {
        this.pwd = pwd;
        return this;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public ResourcePwd createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Resource getResource() {
        return resource;
    }

    public ResourcePwd resource(Resource resource) {
        this.resource = resource;
        return this;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ResourcePwd)) {
            return false;
        }
        return id != null && id.equals(((ResourcePwd) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ResourcePwd{" +
            "id=" + getId() +
            ", pwd='" + getPwd() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            "}";
    }
}
