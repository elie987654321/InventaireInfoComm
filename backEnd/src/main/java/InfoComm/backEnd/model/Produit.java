package InfoComm.backEnd.model;


import jakarta.persistence.*;

@Entity
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "prod_id")
    private Integer id;
    @Column(name = "prod_modele")
    private String modele;
    @JoinColumn(name = "prod_fab_id", referencedColumnName = "fab_id")
    private String fabricant;
    @Column(name = "prod_cat_id")
    private String categorie;

    public String getCatgorie() {
        return categorie;
    }

    public void setCatgorie(String catgorie) {
        this.categorie = catgorie;
    }

    public String getFabricant() {
        return fabricant;
    }

    public void setFabricant(String fabricant) {
        this.fabricant = fabricant;
    }

    public String getModele() {
        return modele;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
