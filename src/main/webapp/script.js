// ==============================================================

// 		EVENTOS


atualizaSessao = function() {

	let req = new XMLHttpRequest();

	req.open("POST", "ControllerServlet", true);

	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	req.onreadystatechange = () => {

		if (req.readyState == 4) {

			if (req.status == 200) {

				// O QUE FAZER SE DEU CERTO

			} else {
				
				alert("Houve um erro ao atualizar");

				// O QUE FAZER SE DEU ERRADO

			}

		}
	}

	req.send("op=START_SESSION");

}


// RESET

reset = function() {

	let req = new XMLHttpRequest();

	req.open("POST", "ControllerServlet", true);

	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	req.onreadystatechange = () => {
		if (req.readyState == 4) {
			if (req.status == 200) {

				atualizaSessao();

				window.location.href = "/prova1";

			} else {
				alert("Houve um erro ao resetar o banco de dados");

				// O QUE FAZER SE DEU ERRADO

			}

		}
	}

	req.send("op=RESET");



	// Aqui você cria uma requisição AJAX POST a ControllerServlet

	// Você repassa, com a chave 'op' o parâmetro 'RESET'

	// Se a requisição for bem sucedida, você executa:

	// atualizaSessao() e window.location.href = "/prova1".

	// Se não for bem sucedida, decida o que fazer.

}


// NOVA AULA

novaAula = function() {

	window.location.href = "nova";

}



// CANCELA NOVA AULA (OU EDIÇÃO)

calcelarNovaAula = function() {

	window.location.href = "/prova1";

}



// EDITA UMA AULA COM ID ESPECIFICADO

editarAula = function(id) {

	window.location.href = "edit?id=" + id;

}


// ENVIA CONTEÚDO DA NOVA AULA

enviarNovaAula = function() {
	// obtém os valores a partir do formulário
	let data = document.getElementById('data-id').value;
	let horario = document.getElementById('hora-id').value;
	let duracao = document.getElementById('dur-id').value;
	let codDisciplina = document.getElementById('disc-id').value;
	let assunto = document.getElementById('ass-id').value;


	// verificando a validação
	if (!validaNovaAula(data, horario, duracao, codDisciplina, assunto)) {
		document.getElementById('msg-id').style.display = 'block';
		return;
	}



	if (validaValores(data, horario, duracao, codDisciplina, assunto) == false) {
		return;
	}


	let req = new XMLHttpRequest();
	req.open("POST", "ControllerServlet", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	req.onreadystatechange = () => {
		if (req.readyState == 4 && req.status == 200) {
			atualizaSessao();
			window.location.href = "/prova1";
		} else if (req.readyState == 4) {
			// O QUE FAZER SE DEU ERRADO
			alert("Houve um erro ao enviar a nova aula.");
		}
	}

	// Constrói o corpo da requisição
	req.send("op=CREATE&data=" + data + "&horario=" + horario + "&duracao=" + duracao + "&codDisciplina=" + codDisciplina + "&assunto=" + assunto);
}



// ENVIA CONTEÚDO EM EDIÇÃO

enviarEdit = function() {

	// obtém os valores a partir do formulário

	let id = document.getElementById('id').innerHTML;

	let data = document.getElementById('data-id').value;

	let horario = document.getElementById('hora-id').value;

	let duracao = document.getElementById('dur-id').value;

	let codDisciplina = document.getElementById('disc-id').value;

	let assunto = document.getElementById('ass-id').value;



	console.log(data, horario, duracao, codDisciplina, assunto)


	if (!validaNovaAula(data, horario, duracao, codDisciplina, assunto)) {

		document.getElementById('msg-id').style.display = 'block';

		return;

	}

	if (validaValores(data, horario, duracao, codDisciplina, assunto) == false) {
		return;
	}

	let req = new XMLHttpRequest();
	req.open("POST", "ControllerServlet", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	req.onreadystatechange = () => {
		if (req.readyState == 4 && req.status == 200) {
			atualizaSessao();
			window.location.href = "/prova1";
		} else if (req.readyState == 4) {
			// O QUE FAZER SE DEU ERRADO
			alert("Houve um erro ao editar a aula.");
		}
	}

	req.send("op=UPDATE&id=" + id + "&data=" + data + "&horario=" + horario + "&duracao=" + duracao + "&codDisciplina=" + codDisciplina + "&assunto=" + assunto);

}



// DELETA UMA AULA

deleta = function(id) {
	let req = new XMLHttpRequest();
	req.open("POST", "ControllerServlet", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.onreadystatechange = () => {

		if (req.readyState == 4) {
			if (req.status == 200) {
				// O QUE FAZER SE DEU CERTO
				atualizaSessao();
				window.location.href = "/prova1";
			} else {
				// O QUE FAZER SE DEU ERRADO
				alert("Houve um erro ao deletar");
			}
		}
	}

	req.send("op=DELETE&id=" + id);
}




const voltarParaoIndex = function() {

	window.location.href = "/prova1";

}


// ============================================================

// 			VALIDAÇÕES


validaNovaAula = function(data, horario, duracao, codDisciplina, assunto) {

	const existsValues = [data, horario, duracao, codDisciplina, assunto].every(value => !!value)

	return existsValues;

}

validaValores = function(data, horario, duracao, codDisciplina, assunto) {

	let verificado = true;

if (!validaData(data)) {
	var div = document.querySelector(".texto");
		div.innerHTML = 'Data inválida, favou escolher uma data posterior';
		document.getElementById('msg-id').style.display = 'block';
        return false;
    }

	if (!isValidTime(horario)) {

		var div = document.querySelector(".texto");
		div.innerHTML = 'Horário inválido. Valores aceitos entre 00:00 e 23:59';
		document.getElementById('msg-id').style.display = 'block';
		return false;
	}

	if (duracao < 1 || duracao > 24) {
		var div = document.querySelector(".texto");
		div.innerHTML = 'Duração inválida. Valores aceitos entre 1 e 23 ';
		document.getElementById('msg-id').style.display = 'block';
		return false;
	}
	if (codDisciplina == 0) {
		var div = document.querySelector(".texto");
		div.innerHTML = 'Escolha uma disciplina';
		document.getElementById('msg-id').style.display = 'block';
		return false;
	}



	return true;


}

function isValidTime(horario) {

	const timePattern = /^([01]?\d|2[0-3]):([0-5]\d)$/;
	const match = horario.match(timePattern);

	if (!match) {
		var div = document.querySelector(".texto");
		div.innerHTML = 'Formato inválido. Valores aceitos entre 00:00 e 23:59 ';
		return false; // Formato inválido
	}

	const hours = parseInt(match[1], 10);
	const minutes = parseInt(match[2], 10);


	if (hours < 0 || hours > 23) {
		return false;
	}


	if (minutes < 0 || minutes > 59) {
		return false;
	}

	return true;
}

function validaData(data) {
    const today = new Date();
    const inputDate = new Date(data);

    if (inputDate < today) {
        var div = document.querySelector(".texto");
        div.innerHTML = 'Data inválida. A data deve ser a partir de hoje.';
        document.getElementById('msg-id').style.display = 'block';
        return false;
    }
    return true;
}
// ===================================================================================

// 		INICIALIZA O PROCESSAMENTO


atualizaSessao();