USE inventaire;

create table if not exists Categorie (
	cat_id integer primary key not null auto_increment,
    cat_nom nvarchar(255) not null
);
create table if not exists Fabricant (
	fab_id integer primary key not null auto_increment,
    fab_nom nvarchar(255) not null
);
create table if not exists Produit (
	pro_id integer primary key not null auto_increment,
    pro_modele nvarchar(255),
	pro_fab_id integer not null,
    pro_cat_id integer not null,
    pro_isDeleted boolean not null,
    
    CONSTRAINT fk_pro_fab_id FOREIGN KEY (pro_fab_id) REFERENCES Fabricant(fab_id),
    CONSTRAINT fk_pro_cat_id FOREIGN KEY (pro_cat_id) REFERENCES Categorie(cat_id)

);
create table if not exists Client (
	cli_id integer primary key not null auto_increment,
    cli_nom nvarchar(255) not null,
    cli_courriel nvarchar(255),
    cli_telephone nvarchar(255),
    cli_isDeleted boolean not null
);
create table if not exists Produit_Client (
	pro_cli_id integer primary key not null auto_increment,
    pro_cli_quantite integer,
    pro_cli_cli_id integer not null,
    pro_cli_pro_id integer not null,
    pro_cli_isDeleted boolean not null,
    
    CONSTRAINT fk_procli_cli_id FOREIGN KEY (procli_cli_id) REFERENCES Client(cli_id),
    CONSTRAINT fk_proli_pro_id FOREIGN KEY (proli_pro_id) REFERENCES Produit(pro_id)
);

create table if not exists Exemplaire (
	exe_id integer primary key not null auto_increment,
    exe_numSerie nvarchar(255) not null,
    exe_prix float,
    exe_note nvarchar(255),
    exe_pro_id integer not null,
    exe_cli_id integer not null,
    exe_isDeleted boolean not null,
    
    CONSTRAINT fk_exe_pro_id FOREIGN KEY (exe_pro_id) REFERENCES Produit(pro_id),
    CONSTRAINT fk_exe_cli_id FOREIGN KEY (exe_cli_id) REFERENCES Client(cli_id)
);
create table if not exists Alerte (
	ale_id integer primary key not null auto_increment,
    ale_seuil integer not null,
    ale_message nvarchar(255) not null,
    ale_date date not null,
    ale_pro_id integer not null,
    
    constraint fk_ale_pro_id foreign key (ale_pro_id) references Produit(pro_id)
);
create table if not exists Role (
	rol_id integer primary key not null auto_increment,
	rol_nom nvarchar(255) not null
);
create table if not exists Utilisateur (
	uti_courriel nvarchar(255) primary KEY,
	uti_password nvarchar(255) not null,
	uti_rol_id integer not null,
    uti_isDeleted boolean not null,
	
	constraint fk_uti_rol_id foreign key (uti_rol_id) references Role(rol_id)
);
create table if not exists Alerte_Utilisateur (
	ale_uti_id integer primary key not null auto_increment,
	ale_uti_ale_id integer not null,
	ale_uti_uti_courriel nvarchar(255) not null,
	
	constraint fk_ale_uti_ale_id foreign key (ale_uti_ale_id) references Alerte(ale_id),
	constraint fk_ale_uti_uti_courriel foreign key (ale_uti_uti_courriel) references Utilisateur(uti_courriel)
);

