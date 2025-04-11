package InfoComm.backEnd.repositories;

import InfoComm.backEnd.model.Alerte;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface AlerteRepository extends CrudRepository<Alerte, Integer>
{
    ArrayList<Alerte> findAllByUtilisateurIdAndIsDeleted(int userId, boolean isDeleted);
}