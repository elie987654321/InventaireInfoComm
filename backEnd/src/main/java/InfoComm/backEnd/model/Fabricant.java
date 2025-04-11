package InfoComm.backEnd.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Fabricant {
    @Id
    @Column(name = "fab_id")
    private int id;
    @Column(name = "fab_nom")
    private String nom;
}
