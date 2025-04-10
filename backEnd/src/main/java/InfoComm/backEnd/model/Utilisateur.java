package InfoComm.backEnd.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
@Entity
public class Utilisateur {
    @Id
    @Column(name = "uti_courriel")
    private String courriel;
    @Column(name = "uti_password")
    private String motPasse;
    @Column(name = "uti_rol_id")
    @JoinColumn(name = "uti_rol_id",referencedColumnName = "rol_id")
    private String role;

    public String getCourriel() {
        return courriel;
    }

    public void setCourriel(String courriel) {
        this.courriel = courriel;
    }

    public String getMotPasse() {
        return motPasse;
    }

    public void setMotPasse(String motPasse) {
        this.motPasse = motPasse;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
