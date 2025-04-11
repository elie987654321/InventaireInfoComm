package InfoComm.backEnd.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Produit")
@NoArgsConstructor
@Getter
@Setter
public class Produit {
    @Id
    @Column(name = "prod_id")
    private int id;
    @Column(name = "prod_quantite")
    private int quantite;
    @Column(name = "prod_modele")
    private String modele;
    @Column(name = "pro_fab_id")
    @JoinColumn(name = "pro_fab_id", referencedColumnName = "fab_id")
    private int fabricant;
    @Column(name = "pro_cat_id")
    @JoinColumn(name = "pro_cat_id", referencedColumnName = "cat_id")
    private int categorie;
    @Column(name= "prod_IsDeleted")
    private boolean isDeleted;

    public Produit(int categorie, int fabricant, String modele, int quantite) {
        this.categorie = categorie;
        this.fabricant = fabricant;
        this.modele = modele;
        this.quantite = quantite;
        this.isDeleted = false;
    }


}
