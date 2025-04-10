package InfoComm.backEnd.model;


import jakarta.persistence.*;

@Entity
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "prod_id")
    private Long id;
    @Column(name = "prod_modele")
    private String modele;
    @JoinColumn(name = "prod_fab_id", referencedColumnName = "fab_id")
    private Long fabricant;
    @JoinColumn(name = "prod_cat_id", referencedColumnName = "cat_id")
    private Long categorie;
    @Column(name= "prod_IsDeleted")
    private boolean isDeleted;

    public Long getCatgorie() {
        return categorie;
    }

    public void setCatgorie(Long categorie) {
        this.categorie = categorie;
    }

    public Long getFabricant() {
        return fabricant;
    }

    public void setFabricant(Long fabricant) {
        this.fabricant = fabricant;
    }

    public String getModele() {
        return modele;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public void setIsDeleted(boolean deleted) {this.isDeleted = deleted;}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
