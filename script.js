document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------
       MENU MOBILE
    ---------------------------------------------------- */
    const menuIcon = document.querySelector('.js-menu-icon');
    const mobileMenu = document.querySelector('.js-mobile-menu');

    if (menuIcon && mobileMenu) {
        // Função para alternar a visibilidade
        const toggleMenu = () => {
            const isHidden = mobileMenu.style.display === 'none' || mobileMenu.style.display === '';
            mobileMenu.style.display = isHidden ? 'flex' : 'none';
        };

        // Garante que o menu esteja oculto em telas grandes, mesmo que o CSS falhe
        if (window.innerWidth > 768) {
             mobileMenu.style.display = 'none';
        }

        // Listener para o clique no ícone
        menuIcon.addEventListener('click', toggleMenu);
        
        // Esconder o menu se a tela for redimensionada para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileMenu.style.display = 'none';
            }
        });

        // Fechar o menu ao clicar em um link (para mobile)
        const navLinks = mobileMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mobileMenu.style.display = 'none';
                }
            });
        });
    }

    /* ----------------------------------------------------
       FORMULÁRIOS COM ENVIO PARA O BREVO
    ---------------------------------------------------- */

    const BREVO_API_KEY = ""; // Espaço reservado para a chave da Brevo. Não publique uma chave real no front-end.
    const BREVO_API_URL = "https://api.brevo.com/v3/contacts";
    const BREVO_LIST_ID = null; // Espaço reservado para o ID da lista da Brevo.

    const formConfigs = [
        { id: "contactForm", msg: ".js-form-message" },
        { id: "contactFormFooter", msg: ".js-form-message-s" },
        // { id: "contactFormPort", msg: ".js-form-message-p" }, // ID removido
        { id: "newsletterForm", msg: ".js-form-message-n", newsletter: true },
        { id: "contactFormAbout", msg: ".js-form-message-a" },
        { id: "contactFormMain", msg: ".js-form-message-m" },
        { id: "contactFormContact", msg: ".js-form-message-c" }
    ];

    formConfigs.forEach(({ id, msg, newsletter }) => {

        const form = document.getElementById(id);
        const msgBox = msg ? document.querySelector(msg) : null;

        if (!form || !msgBox) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            msgBox.textContent = "Enviando...";
            msgBox.style.color = "blue";

            const formData = new FormData(form);

            const email = formData.get("email");
            const name = formData.get("name");
            const message = formData.get("message");

            if (!email || !email.includes("@")) {
                msgBox.textContent = "Por favor, insira um e-mail válido.";
                msgBox.style.color = "red";
                return;
            }

            const payload = {
                email: email,
                attributes: {
                    FNAME: name || "",
                    MESSAGE: message || ""
                },
                ...(BREVO_LIST_ID ? { listIds: [BREVO_LIST_ID] } : {}),
                updateEnabled: true
            };

            if (!BREVO_API_KEY) {
                console.warn("Integração com a Brevo não configurada. Adicione a chave em ambiente seguro antes de ativar o envio.");
                msgBox.textContent = "Formulário sem integração configurada no momento.";
                msgBox.style.color = "orange";
                return;
            }

            try {
                const response = await fetch(BREVO_API_URL, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "api-key": BREVO_API_KEY
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok || response.status === 201) {
                    msgBox.textContent = newsletter
                        ? "Inscrição realizada com sucesso!"
                        : "Mensagem enviada! Em breve entraremos em contato.";

                    msgBox.style.color = "green";
                    form.reset();

                } else {
                    const errorData = await response.json();
                    console.error("Brevo Error:", errorData);

                    if (errorData.code === "duplicate_parameter") {
                        msgBox.textContent = "Este e-mail já está cadastrado.";
                        msgBox.style.color = "orange";
                    } else {
                        msgBox.textContent = "Erro ao enviar. Tente novamente.";
                        msgBox.style.color = "red";
                    }
                }

            } catch (err) {
                console.error("Network Error:", err);
                msgBox.textContent = "Falha de conexão. Tente mais tarde.";
                msgBox.style.color = "red";
            }
        });
    });

    /* ----------------------------------------------------
       FAQ (caso exista)
    ---------------------------------------------------- */
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.faq-item');
            item.classList.toggle('faq-item-open');

            const body = item.querySelector('.faq-body');
            body.style.maxHeight = item.classList.contains('faq-item-open')
                ? body.scrollHeight + "px"
                : null;
        });
    });

    /* ----------------------------------------------------
       CLIENTES - Carrossel de Logos (Ajuste JS opcional)
    ---------------------------------------------------- */
    // A animação do carrossel foi movida para o CSS. 
    // O JavaScript pode ser usado aqui para criar um carrossel mais robusto se o CSS falhar, mas o CSS é mais performático.
    
    /* ----------------------------------------------------
       CLIENTES - Mapa Interativo (Ajuste JS opcional para mobile)
    ---------------------------------------------------- */
    // O mapa foi ajustado via CSS para o efeito hover. Para dispositivos móveis (clique/toque):
    const stateDots = document.querySelectorAll('.state-dot');

    stateDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                const tooltip = dot.querySelector('.state-tooltip');
                
                // Oculta todos os outros tooltips
                document.querySelectorAll('.state-tooltip').forEach(t => {
                    if (t !== tooltip) {
                        t.style.visibility = 'hidden';
                    }
                });

                // Alterna a visibilidade do tooltip clicado
                tooltip.style.visibility = tooltip.style.visibility === 'visible' ? 'hidden' : 'visible';
                
                // Previne que o clique suba para o body
                e.stopPropagation(); 
            }
        });
    });

    // Ocultar tooltip ao clicar fora (somente para mobile)
    document.body.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            document.querySelectorAll('.state-tooltip').forEach(t => {
                t.style.visibility = 'hidden';
            });
        }
    });

});

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("mapOverlay");
  if (!overlay) {
    console.warn("mapOverlay não encontrado. Confira o id no HTML.");
    return;
  }

  const points = [
    { uf: "AL", top: 38, left: 62,  empresas: "Intercement" },
    { uf: "SE", top: 40, left: 64.5, empresas: "Votorantim Cimentos" },
    { uf: "BA", top: 48, left: 58,  empresas: "Intercement" },
    { uf: "DF", top: 43, left: 47,  empresas: "Votorantim Cimentos" },
    { uf: "GO", top: 48, left: 45,  empresas: "Votorantim Cimentos, Intercement" },
    { uf: "MT", top: 45, left: 36,  empresas: "Votorantim Cimentos" },
    { uf: "MS", top: 55, left: 38,  empresas: "Votorantim Cimentos, Intercement" },
  ];

  overlay.innerHTML = "";

  points.forEach((p) => {
    const dot = document.createElement("div");
    dot.className = "state-dot";
    dot.style.top = `${p.top}%`;
    dot.style.left = `${p.left}%`;

    const tip = document.createElement("span");
    tip.className = "state-tooltip";
    tip.textContent = `${p.uf}: ${p.empresas}`;

    dot.appendChild(tip);
    overlay.appendChild(dot);
  });

  // Toque no mobile
  overlay.addEventListener("click", (e) => {
    const dot = e.target.closest(".state-dot");
    if (!dot) return;
    overlay.querySelectorAll(".state-dot.is-active").forEach(d => d.classList.remove("is-active"));
    dot.classList.add("is-active");
  });
});






const dadosMapa = {
    AL: "Alagoas – Intercement",
    SE: "Sergipe – Votorantim Cimentos",
    BA: "Bahia – Intercement",
    DF: "Distrito Federal – Votorantim Cimentos",
    GO: "Goiás – Votorantim Cimentos, Intercement",
    MT: "Mato Grosso – Votorantim Cimentos",
    MS: "Mato Grosso do Sul – Votorantim Cimentos, Intercement"
  };
  
  const tooltip = document.getElementById("mapTooltip");
  
  document.querySelectorAll("#mapaBrasil .estado").forEach(el => {
    el.addEventListener("mousemove", e => {
      const uf = el.dataset.uf;
      tooltip.textContent = dadosMapa[uf];
      tooltip.style.left = e.pageX + "px";
      tooltip.style.top = (e.pageY - 15) + "px";
      tooltip.classList.add("show");
    });
  
    el.addEventListener("mouseleave", () => {
      tooltip.classList.remove("show");
    });
  });
  
  





  

  (function(){
    const mapEl = document.getElementById("br-map");
    if(!mapEl) return;

    // ✅ Troque aqui pelos seus clientes reais
    const DATA = {
      al: { nome: "Alagoas", empresas: ["Intercement"] },
      se: { nome: "Sergipe", empresas: ["Votorantim Cimentos"] },
      pb: { nome: "Paraíba", empresas: ["Elizabeth Cimentos"] },
      ba: { nome: "Bahia", empresas: ["Intercement"] },
      df: { nome: "Distrito Federal", empresas: ["Votorantim Cimentos"] },
      go: { nome: "Goiás", empresas: ["Votorantim Cimentos", "Intercement"] },
      mt: { nome: "Mato Grosso", empresas: ["Votorantim Cimentos"] },
      ms: { nome: "Mato Grosso do Sul", empresas: ["Votorantim Cimentos", "Intercement"] },
      rs: { nome: "Rio Grande do Sul", empresas: ["Intercement"] },

      // se quiser habilitar outros estados, é só adicionar:
      // sp: { nome:"São Paulo", empresas:["..."] },
    };

    const titleEl = document.getElementById("map-title");
    const subEl   = document.getElementById("map-sub");
    const listEl  = document.getElementById("map-list");

    const states = Array.from(mapEl.querySelectorAll(".state[data-state]"));

    // Desabilita os que não têm dados
    states.forEach(a => {
      const uf = (a.getAttribute("data-state") || "").toLowerCase();
      if(!DATA[uf]) a.classList.add("is-disabled");
    });

    function render(uf){
      const info = DATA[uf];
      if(!info) return;

      titleEl.textContent = `${info.nome} (${uf.toUpperCase()})`;
      subEl.textContent = "Empresas atendidas:";

      listEl.innerHTML = "";
      info.empresas.forEach(emp => {
        const li = document.createElement("li");
        li.textContent = emp;
        listEl.appendChild(li);
      });
    }

    function setActive(uf){
      states.forEach(a => a.classList.remove("is-active"));
      const active = mapEl.querySelector(`.state[data-state="${uf}"]`);
      if(active) active.classList.add("is-active");
      render(uf);
    }

    // Clique / hover
    states.forEach(a => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const uf = (a.getAttribute("data-state") || "").toLowerCase();
        if(!DATA[uf]) return;
        setActive(uf);
      });

      a.addEventListener("mouseenter", () => {
        const uf = (a.getAttribute("data-state") || "").toLowerCase();
        if(!DATA[uf]) return;
        render(uf);
      });
    });

    // Inicial (opcional)
    setActive("al");

  })();


