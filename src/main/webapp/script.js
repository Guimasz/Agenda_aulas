// ==============================================================
// 		EVENTOS

// RESET
reset = function() {
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
    // Aqui, você faz uma requisição AJAX POST a ControllerServlet e
    // envia a chave 'op' valendo 'CREATE'. Envie, do mesmo modo, os parâmetros
    // data, horario, duracao, codDisciplina e assunto.
    // Se a requisição for bem sucedida, execute atualizaSessao() e
    // window.location.href = "/prova1"
    // Se não for bem sucedida, decida o que fazer
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
	// Aqui, você faz uma requisição AJAX POST a ControllerServlet e
    // envia a chave 'op' valendo 'UPDATE'. Envie, do mesmo modo, os parâmetros
    // id, data, horario, duracao, codDisciplina e assunto.
    // Se a requisição for bem sucedida, execute atualizaSessao() e
    // window.location.href = "/prova1"
    // Se não for bem sucedida, decida o que fazer
}

// DELETA UMA AULA
deleta = function(id) {
	// Aqui, você faz uma requisição AJAX POST a ControllerServlet e
    // envia a chave 'op' valendo 'DELETE'. Envie, do mesmo modo, o parâmetro id
    // Se a requisição for bem sucedida, execute atualizaSessao() e
    // window.location.href = "/prova1"
    // Se não for bem sucedida, decida o que fazer
	let req = new XMLHttpRequest();
	req.open("POST", "ControllerServlet", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.onreadystatechange = () => {
		if (req.readyState == 4 && req.status == 200) {
			atualizaSessao();
			window.location.href = "/prova1";
		} else {
			// O QUE FAZER SE DEU ERRADO
		}
	}
	req.send("op=DELETE&id=" + id);
}




const atualizaSessao = function() {
	let req = new XMLHttpRequest();
	req.open("POST", "ControllerServlet", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.onreadystatechange = () => {
		if (req.readyState == 4 && req.status == 200) {
			// O QUE FAZER SE DEU CERTO
		} else {
			// O QUE FAZER SE DEU ERRADO
		}
	}
	req.send("op=START_SESSION");
}



// ============================================================
// 			VALIDAÇÕES

validaNovaAula = function(data, horario, duracao, codDisciplina, assunto) {
    // Examine os valores dos parâmetros deste método e decida se estão
    // ou não validados. Este 'return true' provavelmente será alterado, não?
    return true;
}





// ===================================================================================
// 		INICIALIZA O PROCESSAMENTO

atualizaSessao();
