package org.jdian.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.jdian.web.rest.TestUtil;

public class ResourcePwdTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ResourcePwd.class);
        ResourcePwd resourcePwd1 = new ResourcePwd();
        resourcePwd1.setId("id1");
        ResourcePwd resourcePwd2 = new ResourcePwd();
        resourcePwd2.setId(resourcePwd1.getId());
        assertThat(resourcePwd1).isEqualTo(resourcePwd2);
        resourcePwd2.setId("id2");
        assertThat(resourcePwd1).isNotEqualTo(resourcePwd2);
        resourcePwd1.setId(null);
        assertThat(resourcePwd1).isNotEqualTo(resourcePwd2);
    }
}
