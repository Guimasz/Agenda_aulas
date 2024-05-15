package program;

import java.util.ArrayList;

import db.Db;
import model.AulaDto;

public class Main {

	public static void main(String[] args) {
		Db db = Db.getInstance();

		ArrayList<AulaDto> lista = db.findAll();
		for (AulaDto dto : lista) {
			System.out.println(dto.toString());
		}

		// Modificando registro de id = 1
		AulaDto aula = db.findById("1");
		aula.assunto = "Integral";
		db.update(aula);

		System.out.println("Encontrando por id(2): ");
		System.out.println(db.findById("2").toString());

		System.out.println("Removendo o id 2, resulta:");
		db.delete("2");
		lista = db.findAll();
		for (AulaDto dto : lista) {
			System.out.println(dto.toString());
		}

	}

}
