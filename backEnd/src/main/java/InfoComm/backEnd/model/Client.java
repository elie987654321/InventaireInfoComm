package InfoComm.backEnd.model;

import jakarta.persistence.*;

@Entity
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cli_id")
    private long id;
    @Column(name = "cli_nom")
    private String nom;
    @Column(name = "cli_courriel")
    private String courriel;
    @Column(name = "cli_telephone")
    private long telephone;


    public long getId() {
        return id;
    }

    public long getTelephone() {
        return telephone;
    }

    public void setTelephone(long telephone) {
        this.telephone = telephone;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getCourriel() {
        return courriel;
    }

    public void setCourriel(String courriel) {
        this.courriel = courriel;
    }
}
