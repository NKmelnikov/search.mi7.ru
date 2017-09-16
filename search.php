<?php $version = '1.06'?>
<html>
<head>
	<title>Search-Mi7.ru</title>
	<link href="css/style.css?v=<?=$version;?>" rel="stylesheet">
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
<main id="contentWrapper">
<section id="adBlock">
		<div class="first-block">
			<a href="" class="ad-header-link-first"></a>
			<img class="imageFirst"
			     src=""
			     alt="">
			<p class="descriptionFirst"></p>
		</div>
		<div class="second-block">
			<a href="" class="ad-header-link-second"></a>
			<img class="imageSecond"
			     src=""
			     alt="">
			<p class="descriptionSecond"></p>
		</div>
		<div class="third-block">
			<a href="" class="ad-header-link-third"></a>
			<img class="imageThird"
			     src=""
			     alt="">
			<p class="descriptionThird"></p>
	</div>
</section>
<article class="main-article article col--biggest md-col--large sm-full-width">

<?php
	function curl_get_contents($url, $proxy = NULL){
		$ch = curl_init();
		if(!is_null($proxy)) {
			curl_setopt($ch, CURLOPT_PROXY, $proxy);
			curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5);
		}
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_URL, $url);
		$responseBody = curl_exec($ch);
		curl_close($ch);
		return $responseBody;
	}
	$query = str_replace(' ', '+', $_GET['q']);
	$xml = simplexml_load_string(curl_get_contents('http://go.mail.ru/xml-installs_pro?q='.$query.'&sf='.$_GET['sf'], null));
	//echo '<pre>'; print_r($xml); print_r($_GET['q']); echo "  ".print_r("this is sf = ".$_GET['sf']); echo '</pre>';
	?>
	<div class="row">
		<div class="col col--biggest md-col--large sm-full-width">
			<div class="i-search-counter">
				<p class="i-big-text">Нашлось <?php echo $xml->totalWebPages; ?> результатов</p>
			</div>
			<div class="search-results">
				<?php if (empty($xml->item)): ?>

				<?php $noResults=true ?>
					<p>К сожалению, результатов нет</p>
				<?php else: ?>
					<?php $noResults=false?>
					<?php foreach ( $xml->item as $post ):?>
						<section class="found-news">
							<h2 class="i-header-medium"><a target="_blank" href="<?php echo $post->landingLink;?>"><?php echo urldecode($post->title);?></a></h2>
							<a class="i-sub-link" href="<?php echo $post->link; ?>"><?php echo urldecode($post->link); ?></a>
							<div class="row">
								<div class="col col--large md-full-width i-text-container">
									<?php echo $post->description; ?>
								</div>
							</div>
						</section>
					<?php endforeach; ?>
				<?php endif ?>
			</div>
		</div>
	</div>
</article>

	<div class="i-pagination" style="display: <?php if($xml->totalWebPages < 40) echo 'none'?>">
		<div class="i-previous-page">назад</div>
		<div class="i-pagination-container">
			<div class="i-movable-container">
				<?php
				$sfParameter = explode("sf=", $_SERVER['QUERY_STRING']);
				$sfParameterIndicator = substr($sfParameter[1],0,1);
				$totalPagesIndicator = substr($xml->totalWebPages,0,1);
				if ($xml->totalWebPages / 20 < 10 && $xml->totalWebPages % 20 != 0) {
					for ($i = 1; $i < ($xml->totalWebPages / 20)+1; $i++) {
						echo '<div class="i-page">' . $i . '</div>';
					}
				} else if($xml->totalWebPages / 20 < 10) {
					for ($i = 1; $i < $xml->totalWebPages / 20; $i++) {
						echo '<div class="i-page">' . $i . '</div>';
					}
				} else	{
					for ($i = 1; $i < 11; $i++) {
						echo '<div class="i-page">' . $i . '</div>';
					}
				}
				?>
			</div>
		</div>
		<div class="i-next-page">дальше</div>
	</div>
	<div class="i-show-more">Показать ещё</div>
</main>
	<?php
	if ($noResults && $_GET['sf']>0){
		echo("<script>
		$('#contentWrapper').hide();
		</script>");
		echo("<div class='i-loading-cloak' style='display:block'></div>");
		$query = $_GET;
		$query['sf'] -= 20;
		$query_result = http_build_query($query);
		echo("<script>window.location.replace('/search.php?".$query_result."');</script>");
	} else {
		echo("<script>
		$('#contentWrapper').fadeIn('3000');
		</script>");
	}
	?>
</body>
</html>
