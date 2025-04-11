package InfoComm.backEnd.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
@Entity
@NoArgsConstructor
@Getter
@Setter
public class Alerte {
    @Id
    @Column(name = "ale_id")
    private int id;
    @Column(name = "ale_seuil")
    private int seuil;
    @Column(name = "ale_message")
    private String message;
    @Column(name = "ale_date")
    private Date date;
    @Column(name = "ale_prod_id")
    @JoinColumn(name = "ale_prod_id",referencedColumnName = "prod_id")
    private long produitId;

}
