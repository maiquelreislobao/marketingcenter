import { useEffect, useState } from "react";

export default function PortalMarketingLobao() {
  const [selectedDept, setSelectedDept] = useState(null);
  const [sortOption, setSortOption] = useState("asc");
  const [viewCounts, setViewCounts] = useState({});

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const savedViews = window.localStorage.getItem("marketing-service-views");
      if (savedViews) {
        setViewCounts(JSON.parse(savedViews));
      }
    } catch (error) {
      console.error("Erro ao carregar visualizações:", error);
    }
  }, []);

  const services = [
    {
      title: "Merchandising",
      description:
        "Solicitação de organização de pontos de venda para fortalecer a presença da marca nas revendas.",
      icon: "🛍️",
      tag: "PDV",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTMRCH/form/308",
      calendarLink:
        "https://clobao.atlassian.net/jira/software/projects/MKTMRCH/boards/749/calendar",
    },
    {
      title: "Roadshow",
      description:
        "Solicitação de visita ao cliente revendedor com carrinha e promotor para apresentação de produtos.",
      icon: "🚐",
      tag: "Visita externa",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTRDSH/form/407",
    },
    {
      title: "Showroom",
      description:
        "Solicitação de reserva de espaço para receber clientes no showroom e realizar apresentações.",
      icon: "🏢",
      tag: "Reserva",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTSHOWR/form/605",
      calendarLink:
        "https://clobao.atlassian.net/jira/software/projects/MKTSHOWR/boards/980/calendar",
    },
    {
      title: "Solicitação de Materiais",
      description:
        "Pedido de brindes, catálogos e materiais de apoio para apresentações em lojas revendedoras.",
      icon: "📦",
      tag: "Apoio comercial",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTSOLCT/form/374",
    },
    {
      title: "Implantações",
      description:
        "Solicitação de desenvolvimento de expositores, materiais para feiras e personalização de revendas.",
      icon: "🧩",
      tag: "Projetos especiais",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTIMP/form/506",
    },
    {
      title: "Gráfico",
      description:
        "Solicitação de produção de materiais gráficos como stickers, catálogos, folhetos promocionais e cartões de visita.",
      icon: "🎨",
      tag: "Criação gráfica",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTGRF/form/572",
    },
    {
      title: "Fotos",
      description:
        "Solicitação de produção de fotos de produtos para catálogos, websites e folhetos promocionais.",
      icon: "📸",
      tag: "Conteúdo visual",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTFOTOS/form/440",
    },
    {
      title: "Digital",
      description:
        "Solicitação de posts, criação de conteúdo para blog e ações de e-mail marketing.",
      icon: "💻",
      tag: "Marketing digital",
      link: "https://clobao.atlassian.net/jira/core/projects/MAR/form/638",
    },
    {
      title: "Vídeos",
      description:
        "Solicitação de produção de vídeos de produtos, campanhas ou cobertura de eventos.",
      icon: "🎥",
      tag: "Audiovisual",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTVIDEOS/form/639",
    },
  ];

  const departmentMap = {
    Comercial: [
      "Merchandising",
      "Solicitação de Materiais",
      "Roadshow",
      "Implantações",
      "Gráfico",
      "Showroom",
    ],
    Direção: services.map((service) => service.title),
    Logística: ["Solicitação de Materiais", "Gráfico"],
    RH: ["Digital", "Vídeos", "Fotos", "Gráfico"],
    SAC: [
      "Gráfico",
      "Solicitação de Materiais",
      "Roadshow",
      "Showroom",
      "Merchandising",
    ],
    SAT: ["Gráfico"],
  };

  const filteredServices = selectedDept
    ? services.filter((service) =>
        (departmentMap[selectedDept] || []).includes(service.title)
      )
    : services;

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortOption === "asc") {
      return a.title.localeCompare(b.title);
    }

    if (sortOption === "desc") {
      return b.title.localeCompare(a.title);
    }

    const viewsA = viewCounts[a.title] || 0;
    const viewsB = viewCounts[b.title] || 0;

    if (viewsB !== viewsA) {
      return viewsB - viewsA;
    }

    return a.title.localeCompare(b.title);
  });

  const handleServiceView = (title) => {
    try {
      const updated = {
        ...viewCounts,
        [title]: (viewCounts[title] || 0) + 1,
      };

      setViewCounts(updated);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "marketing-service-views",
          JSON.stringify(updated)
        );
      }
    } catch (error) {
      console.error("Erro ao guardar visualizações:", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10 bg-gradient-to-br from-red-600 via-red-500 to-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              🚀 Portal de Solicitações de Marketing
            </div>

            <h1 className="text-4xl font-black md:text-5xl">
              Central de solicitações de Marketing
            </h1>

            <p className="mt-4 text-white/80">
              Portal interno para envio de solicitações ao departamento de Marketing através de formulários Jira organizados por categoria.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <p className="mb-2 text-sm text-zinc-400">
          Selecione seu departamento para filtrar as solicitações mais relevantes
        </p>
        <h2 className="mb-6 text-2xl font-black">Solicitar por departamento</h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {Object.keys(departmentMap).map((dept) => (
            <button
              key={dept}
              onClick={() =>
                setSelectedDept(selectedDept === dept ? null : dept)
              }
              className={`rounded-xl border px-4 py-4 text-sm font-semibold transition ${
                selectedDept === dept
                  ? "border-red-500 bg-red-500"
                  : "border-white/10 bg-zinc-900 hover:border-red-500/40 hover:bg-zinc-800"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 pb-14 lg:px-10">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black">
              {selectedDept
                ? `Solicitações recomendadas para ${selectedDept}`
                : "Escolha a categoria da solicitação"}
            </h2>
            <p className="max-w-xl text-sm text-zinc-400">
              Cada categoria leva a um formulário específico no Jira.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900 p-1">
              <button
                onClick={() => setSortOption("asc")}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  sortOption === "asc"
                    ? "bg-red-500 text-white"
                    : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                Crescente
              </button>
              <button
                onClick={() => setSortOption("desc")}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  sortOption === "desc"
                    ? "bg-red-500 text-white"
                    : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                Decrescente
              </button>
              <button
                onClick={() => setSortOption("views")}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  sortOption === "views"
                    ? "bg-red-500 text-white"
                    : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                Mais vistas
              </button>
            </div>

            {selectedDept && (
              <button
                onClick={() => setSelectedDept(null)}
                className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:border-red-500/40 hover:bg-zinc-800"
              >
                Limpar filtro
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {sortedServices.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-white/10 bg-zinc-900 p-5 transition hover:-translate-y-1 hover:border-red-500/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-3xl">{service.icon}</div>
                <span className="text-xs text-zinc-400">{service.tag}</span>
              </div>

              <h3 className="text-lg font-bold">{service.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{service.description}</p>

              {sortOption === "views" && (
                <p className="mt-3 text-xs text-zinc-500">
                  Visualizações: {viewCounts[service.title] || 0}
                </p>
              )}

              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleServiceView(service.title)}
                  className="block w-full rounded-xl bg-white px-4 py-2 text-center text-sm font-bold text-black transition hover:bg-red-500 hover:text-white"
                >
                  Abrir formulário Jira
                </a>

                {service.calendarLink ? (
                  <a
                    href={service.calendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-xl border border-white/20 px-4 py-2 text-center text-sm font-semibold text-white transition hover:border-red-500/40 hover:bg-zinc-800"
                  >
                    Ver agenda
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
