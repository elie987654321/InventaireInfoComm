package InfoComm.backEnd.validation;

import InfoComm.backEnd.model.Produit;
import InfoComm.backEnd.repositories.ProduitRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ProduitValidateur {
    private ProduitRepository repository;

    public String validateProduit(Produit produit){
        return "";
    }
}
