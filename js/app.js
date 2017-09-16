$(document).ready(function(){
	$('.found-news').each(function(){  // в случае если title пустой, весь блок убирается
		if (!$(this).children().eq(0).text().trim().length) {
			$(this).hide();
		}
	});
	$('.i-text-container').each(function(){  // в случае если description пустой, подставляется фраза "Найдено по ссылке" (как на mail.ru)
		if (!$(this).text().trim().length) {
			$(this).text('Найден по ссылке');
		}
	});
	$('.i-sub-link').each(function() { // отображает ссылки до символа �
		let string = $(this).text().split("�");
		$(this).text(string[0]);
	});
	//---------В случае если описание и ссылка превышает заданный размер, оно обрезается под него-------
	$('.i-text-container').each(function () {
		if ($(this).text().length > 300) {
			let substr = $(this).text().substring(0, 300);
			$(this).text(substr);
		}
	});
	$('.i-sub-link').each(function () {
		if ($(this).text().length > 50) {
			let substr = $(this).text().substring(0, 50);
			$(this).text(substr);
		}
	});
//----------------------------------------------------------------------------------------------------
//---------Поиск GET параметров в урле, маркировка текущей страницы, подстановка поискового параметра в главный input-------
	let qs = (function(a) {
		if (a == "") return {};
		let b = {};
		for (let i = 0; i < a.length; ++i)
		{
			let p=a[i].split('=', 2);
			if (p.length == 1)
				b[p[0]] = "";
			else
				b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		return b;
	})(window.location.search.substr(1).split('&'));


	$('.i-movable-container').children().eq(qs['sf']/20).addClass('active');
	$('#textField').val(qs['q']);
//---------------------------------------------------------------------------------------------------------------------------

//-----Перелистывание страниц-----
	if ($('.active').text() > 11 && $('.active').text() <= 21){
		$('.i-movable-container').css({'margin':'0 0 0 -540px'});
	} else if($('.active').text() >= 22 && $('.active').text() <= 32){
		$('.i-movable-container').css({'margin':'0 0 0 -990px'});
	}
//--------------------------------
//-----Блокировка кнопок "вперед"-"назад"-----
	if ($('.active').text() == 1) {
		$(".i-previous-page").css({'pointer-events':'none', 'color':'gray'});
	} else if ($('.active').text() == $('.i-page:last-child').text() || $('.active').text() == 10) {
		$(".i-next-page").css({'pointer-events':'none', 'color':'gray'});
	}
//--------------------------------
	function pageSwitcher(sf){
		window.location.replace('/search.php?q='+qs['q']+'&sf='+sf);
	}

	$('.i-page').click(function () {
		$('.i-page').removeClass('active');
		$(this).addClass('active');
		pageSwitcher(($(this).text()-1)*20);
	});

	$('.i-previous-page').click(function () {
		$('.active').prev(".i-page").addClass('active');
		$('.active').next(".i-page").removeClass('active');
		pageSwitcher(($('.active').text()-1)*20);
		let offSet = $('.active').offset().left - $('.i-pagination-container').offset().left;
		if (offSet < 15 && $('.active').text() != 1) {
			$('.i-movable-container').animate({
				'marginLeft': "+=50px"
			});
		}
	});

	$('.i-next-page').click(function () {
		$('.active').next(".i-page").addClass('active');
		$('.active').prev(".i-page").removeClass('active');
		pageSwitcher(($('.active').text()-1)*20);
		let offSet = $('.i-pagination-container').offset().left - ($('.active').offset().left - $('.i-pagination-container').width());
		if (offSet < 15 && $('.active').text() != $('.i-page:last-child').text()) {
			$('.i-movable-container').animate({
				'marginLeft': "-=50px"
			});
		}
	});
	$('.ad-header-link-first, .ad-header-link-second, .ad-header-link-third').click(function (e) {
		e.preventDefault();
	});

	$('.first-block, .second-block, .third-block').click(function (e) {
		window.open($('.ad-header-link-first').prop('href'));
	});

	// ----------получение рекламы------------
		$.ajax({
			type:'GET',
			dataType: 'jsonp',
			crossDomain: true,
			url: 'http://ad.mail.ru/adq/?q=100660&callback=callback',
		});
});

function callback(json) {
	console.log(json);
	if(window.location.href.indexOf("search") > -1 && json[0].html) {
		$('.i-search-counter').css('top','-125px');
		$('#adBlock').css('display','flex');
	}
	if(json[0].html){
		console.log(json[0]);
		console.log(JSON.parse(json[0].html));
		if(JSON.parse(json[0].html)){

			let threeBanners = {
				bannerFirst: JSON.parse(json[0].html).banners[0],
				bannerSecond: JSON.parse(json[0].html).banners[1],
				bannerThird: JSON.parse(json[0].html).banners[2]
			};
			if(threeBanners.bannerThird){
				$('#adBlock').addClass('third-banner');
			}
			let banner_idFirst = threeBanners.bannerFirst.banner_id;
			let descriptionFirst = threeBanners.bannerFirst.description;
			let headerFirst = threeBanners.bannerFirst.header;
			let imageFirst= threeBanners.bannerFirst.image;
			let urlFirst = threeBanners.bannerFirst.url;
			$('.imageFirst').prop('src',imageFirst);
			$('.ad-header-link-first').text(headerFirst);
			$('.ad-header-link-first').prop('href',urlFirst);
			$('.descriptionFirst').text(descriptionFirst);
			$('.urlFirst').text(urlFirst.split('/')[0]);
			$('.second-block').hide();
			$('.third-block').hide();
			if(threeBanners.bannerSecond){
				$('.second-block').show();
				let banner_idSecond = threeBanners.bannerSecond.banner_id;
				let descriptionSecond = threeBanners.bannerSecond.description;
				let headerSecond = threeBanners.bannerSecond.header;
				let imageSecond = threeBanners.bannerSecond.image;
				let urlSecond = threeBanners.bannerSecond.url;
				$('.imageSecond').prop('src',imageSecond);
				$('.ad-header-link-second').text(headerSecond);
				$('.ad-header-link-second').prop('href',urlSecond);
				$('.descriptionSecond').text(descriptionSecond);
				$('.urlSecond').text(urlSecond);
				if(threeBanners.bannerThird){
					$('.third-block').show();
					let banner_idThird = threeBanners.bannerThird.banner_id;
					let descriptionThird = threeBanners.bannerThird.description;
					let headerThird = threeBanners.bannerThird.header;
					let imageThird = threeBanners.bannerThird.image;
					let urlThird = threeBanners.bannerThird.url;
					$('.imageThird').prop('src',imageThird);
					$('.ad-header-link-third').text(headerThird);
					$('.ad-header-link-third').prop('href',urlThird);
					$('.descriptionThird').text(descriptionThird);
					$('.urlThird').text(urlThird);
				}
			}
		}
	}
}
