package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import enums.DisciplinaEnum;
import model.Aula;
import model.AulaDto;

public class Db {

	private static Db instance = null;
	private Connection connection = null;

	private String driver;
	private String url;
	private String user;
	private String password;

	private Db() {
		this.confDB();
		this.conectar();
		this.criarTabela();
	}

	public static Db getInstance() {
		if (instance == null) {
			instance = new Db();
		}
		return instance;
	}

	private void confDB() {
	    try {
	    	this.driver = "org.h2.Driver";
			this.url = "jdbc:h2:mem:testdb";
			this.user = "sa";
			this.password = "";
	        Class.forName(this.driver);
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	}


	// Inicia a conexão com o banco de dados -- FUNCIONANDO
	public void conectar() {
		try {
			this.connection = DriverManager.getConnection(this.url, this.user, this.password);
			System.out.println("A conexão foi um sucesso");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	// Cria a tabela no banco de dados -- FUNCIONANDO
	private void criarTabela() {
	    String tableName = "AULA";
	    String queryCheckTableExists = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = ?";
	    String queryCreateTable = "CREATE TABLE " + tableName + " ("
	        + "    ID BIGINT AUTO_INCREMENT PRIMARY KEY,"
	        + "    COD_DISCIPLINA INT,"
	        + "    DISCIPLINA VARCHAR(255),"
	        + "    ASSUNTO VARCHAR(255),"
	        + "    DURACAO INT,"
	        + "    DATA VARCHAR(20),"
	        + "    HORARIO VARCHAR(20)"
	        + ")";

	    try {
	        // Verifica se a tabela já existe
	        PreparedStatement checkTableStatement = this.connection.prepareStatement(queryCheckTableExists);
	        checkTableStatement.setString(1, tableName);
	        ResultSet resultSet = checkTableStatement.executeQuery();

	        if (!resultSet.next()) { 
	            Statement statement = this.connection.createStatement();
	            statement.executeUpdate(queryCreateTable);
	            this.connection.commit();
	            System.out.println("A tabela foi criada com sucesso");
	        } else {
	            System.out.println("A tabela já existe");
	        }
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
	}


	// Encerra a conexão
	public void close() {
		try {
			this.connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/*
	 * ****************************************************************
	 * CRUD
	 * ****************************************************************
	 */

	// CRUD READ
	public ArrayList<AulaDto> findAll() {
	    String query = "SELECT ID, COD_DISCIPLINA, DISCIPLINA, ASSUNTO, DURACAO, DATA, HORARIO FROM AULA;";
	    ArrayList<AulaDto> lista = new ArrayList<AulaDto>();

	    try {
	        Statement statement = this.connection.createStatement();
	        ResultSet resultSet = statement.executeQuery(query);

	        while (resultSet.next()) {
	            AulaDto aulaDto = new AulaDto();
	            
	            // Preenche os campos de AulaDto com os dados do ResultSet
	            aulaDto.id = Long.toString(resultSet.getLong("ID"));
	            aulaDto.codDisciplina = Integer.toString(resultSet.getInt("COD_DISCIPLINA"));
	            aulaDto.disciplina = resultSet.getString("DISCIPLINA");
	            aulaDto.assunto = resultSet.getString("ASSUNTO");
	            aulaDto.duracao = Integer.toString(resultSet.getInt("DURACAO"));
	            aulaDto.data = resultSet.getString("DATA");
	            aulaDto.horario = resultSet.getString("HORARIO");
	            
	            lista.add(aulaDto);
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }

	    if (lista.isEmpty()) 
	        System.out.println("A lista está vazia");
	    

	    return lista;
	}


	// CRUD READ ID --FUNCIONANDO
	public AulaDto findById(String id) {
	    String query = "SELECT ID, COD_DISCIPLINA, DISCIPLINA, ASSUNTO, DURACAO, DATA, HORARIO FROM AULA WHERE ID = ?";
	    AulaDto aulaDto = null;

	    try {

	        PreparedStatement statement = this.connection.prepareStatement(query);
	        statement.setString(1, id);
	        
	        ResultSet resultSet = statement.executeQuery();

	        // Verificar se há resultados
	        if (resultSet.next()) {
	            aulaDto = new AulaDto();
	            aulaDto.id = Long.toString(resultSet.getLong("ID"));
	            aulaDto.codDisciplina = Integer.toString(resultSet.getInt("COD_DISCIPLINA"));
	            aulaDto.disciplina = resultSet.getString("DISCIPLINA");
	            aulaDto.assunto = resultSet.getString("ASSUNTO");
	            aulaDto.duracao = Integer.toString(resultSet.getInt("DURACAO"));
	            aulaDto.data = resultSet.getString("DATA");
	            aulaDto.horario = resultSet.getString("HORARIO");
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }

	    return aulaDto;
	}


	// CRUD CREATE -- FUNCIONANDO
	public void create(AulaDto dto) {
	    String query = "INSERT INTO AULA (COD_DISCIPLINA, DISCIPLINA, ASSUNTO, DURACAO, DATA, HORARIO) "
	                    + "VALUES (?,?,?,?,?,?)";

	    try {
	        PreparedStatement preparedStatement = this.connection.prepareStatement(query);
	        
	        // Obter o enum DisciplinaEnum correspondente ao código inserido
	        DisciplinaEnum disciplina = DisciplinaEnum.getDiscByCodigo(Integer.parseInt(dto.codDisciplina));

	        // Verificar se o enum não é nulo
	        if (disciplina != null) {
	            // Definir o código e o nome da disciplina
	            preparedStatement.setInt(1, disciplina.getCodigo());
	            preparedStatement.setString(2, disciplina.getNome());
	        } else {
	            // Se o enum for nulo, definir o código como o valor inserido e o nome como nulo
	            preparedStatement.setInt(1, Integer.parseInt(dto.codDisciplina));
	            preparedStatement.setString(2, null); // ou uma string vazia, dependendo dos requisitos
	        }

	        preparedStatement.setString(3, dto.assunto);
	        preparedStatement.setInt(4, Integer.parseInt(dto.duracao));
	        preparedStatement.setString(5, dto.data);
	        preparedStatement.setString(6, dto.horario);

	        // Executar a inserção
	        preparedStatement.executeUpdate();
	        System.out.println("Aula cadastrada com sucesso!");
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}



	// CRUD DELETE -- FUNCIONANDO
	public void deleteAll() {
		String query = "DELETE FROM AULA";
		try {
			Statement st = this.connection.createStatement();
			st.execute(query);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	// CRUD DELETE -- FUNCIONANDO
	public void delete(String id) {
		String query = "DELETE FROM AULA WHERE ID = ?";
		try {
			PreparedStatement pst = this.connection.prepareStatement(query);
			pst.setString(1, id);
			pst.execute();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// CRUD UPDATE
	public void update(AulaDto dto) {
	    String query = "UPDATE AULA SET "
	            + "COD_DISCIPLINA = ?, DISCIPLINA = ?, ASSUNTO = ?, DURACAO = ?, DATA = ?, HORARIO = ? "
	            + "WHERE ID = ?";
	    try {
	        PreparedStatement pst = this.connection.prepareStatement(query);
	        pst.setInt(1, Integer.parseInt(dto.codDisciplina));
	        pst.setString(2, dto.disciplina);
	        pst.setString(3, dto.assunto);
	        pst.setInt(4, Integer.parseInt(dto.duracao));
	        pst.setString(5, dto.data);
	        pst.setString(6, dto.horario);
	        pst.setLong(7, Long.parseLong(dto.id));
	        
	        pst.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}


	/*
	 * PARA EFEITO DE TESTES
	 */

	public void reset() {
		this.deleteAll();
		this.popularTabela();
	}

	// No método popularTabela da classe Db
	public void popularTabela() {
	    AulaDto dto1 = new AulaDto();
	    dto1.codDisciplina = "1";
	    dto1.assunto = "Derivadas";
	    dto1.duracao = "2";
	    dto1.data = "2024-04-12";
	    dto1.horario = "14:00";
	    this.create(dto1);

	    AulaDto dto2 = new AulaDto();
	    dto2.codDisciplina = "1";
	    dto2.assunto = "Coordenadas Cartesianas";
	    dto2.duracao = "2";
	    dto2.data = "2024-04-13";
	    dto2.horario = "14:00";
	    this.create(dto2);

	    AulaDto dto3 = new AulaDto();
	    dto3.codDisciplina = "1";
	    dto3.assunto = "O Problema dos Três Corpos";
	    dto3.duracao = "4";
	    dto3.data = "2024-04-14";
	    dto3.horario = "14:00";
	    this.create(dto3);
	}


}

