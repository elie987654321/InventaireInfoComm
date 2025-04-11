package InfoComm.backEnd.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Categorie {
    @Id
    @Column(name = "cat_id")
    private int id;
    @Column(name = "cat_nom")
    private String nom;
}
