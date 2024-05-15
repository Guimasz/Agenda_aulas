<%@page import="model.AulaDto"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="style.css">
<title>Aulas</title>
</head>
<body>
	<header class="container-cabecalho">
	    <h3>Minhas Aulas</h3>
	</header>
	<nav class="container-nav">
		<div class="btn-nav" onclick="novaAula()">NOVA</div>
		<div class="btn-nav" onclick="reset()">RESET</div>
	</nav>
	<div class="container-geral">
		<%
		HttpSession sessao = request.getSession();
		// Aqui você vai precisar recuperar dados na sessão.
		// Abaixo, vai trocar 'false' pela condição que identifica dados na sessão.
		if (false) {
			// Aqui, você cria uma estrutura de dados com os dto's que contém os atributos
			// de cada uma das aulas. Os atributos devem ser inseridos no código html abaixo
			// em lugares apropriados. << remova new ArrayList() >> e o sibstitua pelo código correto.
			// Note que parâmetros devem ser enviados em editarAula() e deleta().
			// Se tiver dúvida, confira uma das outras páginas jsp.
			ArrayList<AulaDto> lista = new ArrayList();
			for (AulaDto a: lista) {
				%>
				<div class="container-aula">
		            <div class="container-linha1">
		                <div class="info">Data: <span class="texto"></span></div>
		                <div class="info">Hora: <span class="texto"></span></div>
		                <div class="info">Duração(h): <span class="texto"></span></div>
		            </div>
		            <div class="container-linha2">
		                <div class="info">Disciplina: <span class="texto"></span></div>
		                <div class="info">Assunto: <span class="texto"></span></div>
		            </div>
		            <div class="container-btns">
		                <div></div>
		                <div class="btn" onclick="editarAula()">EDITAR</div>
		                <div class="btn" onclick="deleta()">REMOVER</div>
		            </div>
		        </div>				
				<%
			}
		}
		%>
		
		<script src="script.js"></script>
	</div>
</body>
</html>