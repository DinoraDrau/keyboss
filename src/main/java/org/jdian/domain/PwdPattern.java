package org.jdian.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A PwdPattern.
 */
@Document(collection = "pwd_pattern")
public class PwdPattern implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("pwd_pattern")
    private String pwdPattern;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public PwdPattern name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwdPattern() {
        return pwdPattern;
    }

    public PwdPattern pwdPattern(String pwdPattern) {
        this.pwdPattern = pwdPattern;
        return this;
    }

    public void setPwdPattern(String pwdPattern) {
        this.pwdPattern = pwdPattern;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PwdPattern)) {
            return false;
        }
        return id != null && id.equals(((PwdPattern) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PwdPattern{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", pwdPattern='" + getPwdPattern() + "'" +
            "}";
    }
}
