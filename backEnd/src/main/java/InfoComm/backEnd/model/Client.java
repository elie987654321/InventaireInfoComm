package InfoComm.backEnd.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Client {
    @Id
    @Column(name = "cli_id")
    private int id;
    @Column(name = "cli_nom")
    private String nom;
    @Column(name = "cli_courriel")
    private String courriel;
    @Column(name = "cli_telephone")
    private int telephone;



}
