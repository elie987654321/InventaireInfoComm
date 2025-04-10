package InfoComm.backEnd.repositories;
import InfoComm.backEnd.model.Produit;
import org.springframework.data.repository.CrudRepository;

public interface ProduitRepository extends CrudRepository<Produit, Integer>{
    Produit findAllByIsDeletedFalse();
    Produit findFirstById(Long id);
}
