package InfoComm.backEnd.classes;

import InfoComm.backEnd.model.Alerte;
import InfoComm.backEnd.model.Produit;

//Ajoute des informations a une alerte de base pour le front end
public class AlerteProduit
{
    private Alerte alerte;
    private Produit produit;

    private int currentStock;

    public Alerte getAlerte() {
        return alerte;
    }

    public void setAlerte(Alerte alerte) {
        this.alerte = alerte;
    }

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public int getCurrentStock() {
        return currentStock;
    }

    public void setCurrentStock(int currentStock) {
        this.currentStock = currentStock;
    }
}
