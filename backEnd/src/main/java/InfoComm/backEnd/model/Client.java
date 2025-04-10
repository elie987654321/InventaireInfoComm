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
}
