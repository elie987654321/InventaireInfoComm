package InfoComm.backEnd.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@NoArgsConstructor
@Getter
@Setter
public class Alerte_Utilisateur {
    @Id
    @Column(name = "aleuti_id")
    private int id;
    @Column(name = "aleuti_ale_id")
    @JoinColumn(name = "aleuti_ale_id",referencedColumnName = "ale_id")
    private int alerteId;
    @Column(name = "aleuti_uti_courriel")
    @JoinColumn(name = "aleuti_uti_courriel",referencedColumnName = "uti_courriel")
    private String courrielUtilisateur;
}
