<?php $version = '1.06'?>
<!DOCTYPE>
<html>
	<head>
		<title>Search-Mi7.ru</title>
		<link href="css/style.css?v=<?=$version; ?>" rel="stylesheet">
		<link href="css/search.css?v=<?=$version;?>" rel="stylesheet">
		<link href="css/ad.css?v=<?=$version;?>" rel="stylesheet">
		<script src="js/jquery-3.2.1.min.js"></script>
		<script src="js/app.js?v=<?=$version;?>"></script>
		<script src="js/suggs.js?v=<?=$version;?>"></script>
	</head>
	<body>
	<header class="header">
		<a href="/">
			<h1>Mi7</h1>
			<h2><span>Поиск</span></h2>
		</a>
		<form action="search.php" class="head-search-form">
			<span class="head-search-form__text"><input id="textField" autocomplete="off" type="text" name="q" placeholder="Поиск в интернете"></span>
			<input type="hidden" name="sf" value="0">
			<span class="head-search-form__button"><input id="mainSearch" type="submit" value="Найти"></span>
		</form>
	</header>
	<article class="main-article article col--biggest md-col--large sm-full-width">
	<section id="searchResults">
	</section>

	</article>
	</body>
</html>
