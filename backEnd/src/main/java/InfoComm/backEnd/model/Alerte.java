package InfoComm.backEnd.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;
@Entity
public class Alerte {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ale_id")
    private long id;
    @Column(name = "ale_seuil")
    private int seuil;
    @Column(name = "ale_message")
    private String message;
    @Column(name = "ale_date")
    private Date date;
    @Column(name = "ale_prod_id")
    @JoinColumn(name = "ale_prod_id",referencedColumnName = "prod_id")
    private long produitId;

    public long getId() {
        return id;
    }

    public int getSeuil() {
        return seuil;
    }

    public void setSeuil(int seuil) {
        this.seuil = seuil;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getProduitId() {
        return produitId;
    }

    public void setProduitId(long produitId) {
        this.produitId = produitId;
    }
}
