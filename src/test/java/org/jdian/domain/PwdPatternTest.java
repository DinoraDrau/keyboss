package org.jdian.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.jdian.web.rest.TestUtil;

public class PwdPatternTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PwdPattern.class);
        PwdPattern pwdPattern1 = new PwdPattern();
        pwdPattern1.setId("id1");
        PwdPattern pwdPattern2 = new PwdPattern();
        pwdPattern2.setId(pwdPattern1.getId());
        assertThat(pwdPattern1).isEqualTo(pwdPattern2);
        pwdPattern2.setId("id2");
        assertThat(pwdPattern1).isNotEqualTo(pwdPattern2);
        pwdPattern1.setId(null);
        assertThat(pwdPattern1).isNotEqualTo(pwdPattern2);
    }
}
