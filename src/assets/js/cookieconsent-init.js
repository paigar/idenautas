var cc = initCookieConsent();

cc.run({
	current_lang: "es",
	autoclear_cookies: true,
	cookie_name: "cc_cookie",
	cookie_expiration: 365,
	force_consent: true,
	autorun: window.location.pathname !== "/uso-de-cookies/",

	gui_options: {
		consent_modal: {
			layout: "cloud",
			position: "middle center",
			transition: "zoom",
		},
		settings_modal: {
			layout: "bar",
			position: "left",
			transition: "slide",
		},
	},

	onChange: function (cookie, changed_preferences) {},

	languages: {
		es: {
			consent_modal: {
				title: "USO DE COOKIES",
				description:
					'Idenautas utiliza cookies propias y de terceros para posibilitar y mejorar tu experiencia de navegacion, mostrarte publicidad personalizada asi como para realizar analisis estadisticos. Puedes elegir si aceptas las cookies utilizadas por Idenautas, o puedes dedicar unos minutos a personalizarlas haciendo click en \'Personalizar\'. <br /><br />Obtendras mas informacion en nuestra <a href="/uso-de-cookies" class="cc-link">politica de cookies</a>.',
				primary_btn: {
					text: "Aceptar y seguir navegando",
					role: "accept_all",
				},
				secondary_btn: {
					text: "Personalizar",
					role: "settings",
				},
			},
			settings_modal: {
				title: "Configuracion de Cookies",
				save_settings_btn: "Guardar configuracion",
				accept_all_btn: "Aceptar todo",
				reject_all_btn: "Rechazar todo",
				close_btn_label: "Cerrar",
				cookie_table_headers: [
					{ col1: "Nombre" },
					{ col2: "Dominio" },
					{ col3: "Descripcion" },
				],
				blocks: [
					{
						title: "La proteccion de tus datos es nuestra prioridad",
						description:
							"Idenautas utiliza cookies propias y de terceros para posibilitar y mejorar tu experiencia de navegacion, mostrarte publicidad personalizada asi como para realizar analisis estadisticos.",
					},
					{
						title: "Cookies estrictamente necesarias",
						description:
							"Son aquellas que permiten al usuario la navegacion a traves de una pagina web, plataforma o aplicacion y la utilizacion de las diferentes opciones o servicios que en ella existan, incluyendo aquellas que el editor utiliza para permitir la gestion y operativa de la pagina web y habilitar sus funciones y servicios.",
						toggle: {
							value: "necessary",
							enabled: true,
							readonly: true,
						},
					},
					{
						title: "Cookies estadisticas",
						description:
							"Las cookies estadisticas ayudan a los propietarios de paginas web a comprender como interactuan los visitantes con esas paginas, reuniendo y proporcionando informacion de forma anonima.",
						toggle: {
							value: "analytics",
							enabled: false,
							readonly: false,
						},
						cookie_table: [
							{
								col1: "^_ga",
								col2: "www.idenautas.com",
								col3: "Registra una identificacion unica que se utiliza para generar datos estadisticos acerca de como utiliza el visitante el sitio web. Es de tipo HTTP y caduca a los dos anos.",
								is_regex: true,
							},
							{
								col1: "_gat",
								col2: "www.idenautas.com",
								col3: "Utilizado por Google Analytics para controlar la tasa de peticiones. Es de tipo HTTP y caduca en un dia.",
							},
							{
								col1: "_gid",
								col2: "www.idenautas.com",
								col3: "Registra una identificacion unica que se utiliza para generar datos estadisticos acerca de como utiliza el visitante el sitio web. Es de tipo HTTP y caduca en un dia.",
							},
						],
					},
					{
						title: "Mas informacion",
						description:
							'Puedes obtener mas informacion en nuestra <a href="/uso-de-cookies" class="cc-link">politica de cookies</a>.',
					},
				],
			},
		},
	},
});