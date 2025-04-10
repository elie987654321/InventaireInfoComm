package InfoComm.backEnd.model;

import jakarta.persistence.*;
@Entity
public class Alerte_Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "aleuti_id")
    private long id;
    @Column(name = "aleuti_ale_id")
    @JoinColumn(name = "aleuti_ale_id",referencedColumnName = "ale_id")
    private long alerteId;
    @Column(name = "aleuti_uti_courriel")
    @JoinColumn(name = "aleuti_uti_courriel",referencedColumnName = "uti_courriel")
    private String courrielUtilisateur;

    public long getId() {
        return id;
    }

    public long getAlerteId() {
        return alerteId;
    }

    public void setAlerteId(long alerteId) {
        this.alerteId = alerteId;
    }

    public String getCourrielUtilisateur() {
        return courrielUtilisateur;
    }

    public void setCourrielUtilisateur(String courrielUtilisateur) {
        this.courrielUtilisateur = courrielUtilisateur;
    }
}
