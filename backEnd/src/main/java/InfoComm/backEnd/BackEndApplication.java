package InfoComm.backEnd;

import InfoComm.backEnd.controller.ProduitController;
import InfoComm.backEnd.repositories.ProduitRepository;
import InfoComm.backEnd.validation.ProduitValidateur;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class BackEndApplication implements CommandLineRunner {
	@Autowired
	private ProduitRepository produitRepository;
	private Logger logger = LoggerFactory.getLogger(ProduitController.class);


	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

	@Bean
	ProduitValidateur getValidateurProduit() {return new ProduitValidateur(produitRepository);}


	@Override
	public void run(String... args) throws Exception {

	}
}
