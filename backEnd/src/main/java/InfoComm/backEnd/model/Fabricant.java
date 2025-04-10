package InfoComm.backEnd.model;

import jakarta.persistence.*;

@Entity
public class Fabricant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "fab_id")
    private long id;
    @Column(name = "fab_nom")
    private String nom;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public long getId() {
        return id;
    }
}
