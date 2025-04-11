package InfoComm.backEnd.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Utilisateur {
    @Id
    @Column(name = "uti_courriel")
    private String courriel;
    @Column(name = "uti_password")
    private String motPasse;
    @Column(name = "uti_rol_id")
    @JoinColumn(name = "uti_rol_id",referencedColumnName = "rol_id")
    private int roleId;
}
