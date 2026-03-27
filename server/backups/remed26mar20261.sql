--
-- PostgreSQL database dump
--

\restrict dPb9bUdNHjiRlGKgTPreSjc4zu5OMayZNmyyw9irEXUcSOT4NRIy4VvyGftaWOb

-- Dumped from database version 15.17 (Ubuntu 15.17-1.pgdg24.04+1)
-- Dumped by pg_dump version 18.3 (Ubuntu 18.3-1.pgdg24.04+1)

-- Started on 2026-03-26 18:31:21 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 244 (class 1259 OID 3275217)
-- Name: Agendamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Agendamentos" (
    id integer NOT NULL,
    nome character varying(200) NOT NULL,
    endereco character varying(200) NOT NULL,
    numero character varying(20) NOT NULL,
    setor character varying(100) NOT NULL,
    cep character varying(9) NOT NULL,
    telefone character varying(50) NOT NULL,
    datavisita text,
    id_turno integer NOT NULL,
    id_user integer,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Agendamentos" OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 3275216)
-- Name: Agendamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Agendamentos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Agendamentos_id_seq" OWNER TO postgres;

--
-- TOC entry 3677 (class 0 OID 0)
-- Dependencies: 243
-- Name: Agendamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Agendamentos_id_seq" OWNED BY public."Agendamentos".id;


--
-- TOC entry 254 (class 1259 OID 3275260)
-- Name: FormasFarmaceuticas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FormasFarmaceuticas" (
    id integer NOT NULL,
    descricao character varying(200) NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."FormasFarmaceuticas" OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 3275259)
-- Name: FormasFarmaceuticas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FormasFarmaceuticas_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FormasFarmaceuticas_id_seq" OWNER TO postgres;

--
-- TOC entry 3678 (class 0 OID 0)
-- Dependencies: 253
-- Name: FormasFarmaceuticas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FormasFarmaceuticas_id_seq" OWNED BY public."FormasFarmaceuticas".id;


--
-- TOC entry 250 (class 1259 OID 3275245)
-- Name: Lotes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Lotes" (
    id integer NOT NULL,
    numero character varying(50) NOT NULL,
    datavencimento timestamp(3) without time zone NOT NULL,
    datafabricacao timestamp(3) without time zone NOT NULL,
    qdte integer NOT NULL,
    id_medicamento integer NOT NULL,
    id_forma_farmaceutica integer NOT NULL,
    id_tipo_medicamento integer NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Lotes" OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 3275244)
-- Name: Lotes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Lotes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Lotes_id_seq" OWNER TO postgres;

--
-- TOC entry 3679 (class 0 OID 0)
-- Dependencies: 249
-- Name: Lotes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Lotes_id_seq" OWNED BY public."Lotes".id;


--
-- TOC entry 256 (class 1259 OID 3275268)
-- Name: Medicamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Medicamentos" (
    id integer NOT NULL,
    descricao character varying(300) NOT NULL,
    principioativo character varying(300) NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Medicamentos" OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 3275267)
-- Name: Medicamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Medicamentos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Medicamentos_id_seq" OWNER TO postgres;

--
-- TOC entry 3680 (class 0 OID 0)
-- Dependencies: 255
-- Name: Medicamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Medicamentos_id_seq" OWNED BY public."Medicamentos".id;


--
-- TOC entry 260 (class 1259 OID 3275286)
-- Name: Pacientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Pacientes" (
    id integer NOT NULL,
    nome character varying(200) NOT NULL,
    cpf character varying(14) NOT NULL,
    datanascimento timestamp(3) without time zone NOT NULL,
    telefone character varying(20) NOT NULL,
    cartaosus integer NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Pacientes" OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 3275285)
-- Name: Pacientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Pacientes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Pacientes_id_seq" OWNER TO postgres;

--
-- TOC entry 3681 (class 0 OID 0)
-- Dependencies: 259
-- Name: Pacientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Pacientes_id_seq" OWNED BY public."Pacientes".id;


--
-- TOC entry 252 (class 1259 OID 3275253)
-- Name: Retiradas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Retiradas" (
    id integer NOT NULL,
    qtde integer NOT NULL,
    id_users integer NOT NULL,
    id_lotes integer NOT NULL,
    id_pacientes integer NOT NULL,
    created timestamp(3) without time zone,
    modified timestamp(3) without time zone
);


ALTER TABLE public."Retiradas" OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 3275252)
-- Name: Retiradas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Retiradas_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Retiradas_id_seq" OWNER TO postgres;

--
-- TOC entry 3682 (class 0 OID 0)
-- Dependencies: 251
-- Name: Retiradas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Retiradas_id_seq" OWNED BY public."Retiradas".id;


--
-- TOC entry 258 (class 1259 OID 3275278)
-- Name: TiposMedicamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TiposMedicamentos" (
    id integer NOT NULL,
    descricao character varying(200) NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TiposMedicamentos" OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 3275277)
-- Name: TiposMedicamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TiposMedicamentos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TiposMedicamentos_id_seq" OWNER TO postgres;

--
-- TOC entry 3683 (class 0 OID 0)
-- Dependencies: 257
-- Name: TiposMedicamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TiposMedicamentos_id_seq" OWNED BY public."TiposMedicamentos".id;


--
-- TOC entry 246 (class 1259 OID 3275227)
-- Name: Turnos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Turnos" (
    id integer NOT NULL,
    descricao character varying(50) NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Turnos" OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 3275226)
-- Name: Turnos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Turnos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Turnos_id_seq" OWNER TO postgres;

--
-- TOC entry 3684 (class 0 OID 0)
-- Dependencies: 245
-- Name: Turnos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Turnos_id_seq" OWNED BY public."Turnos".id;


--
-- TOC entry 248 (class 1259 OID 3275235)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(100) NOT NULL,
    role character varying(100),
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 3275234)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- TOC entry 3685 (class 0 OID 0)
-- Dependencies: 247
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 242 (class 1259 OID 3096236)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 3095914)
-- Name: agendamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agendamentos (
    id integer NOT NULL,
    nome character varying(200) NOT NULL,
    endereco character varying(200) NOT NULL,
    numero character varying(20) NOT NULL,
    setor character varying(100) NOT NULL,
    cep character varying(9) NOT NULL,
    telefone character varying(50) NOT NULL,
    datavisita text,
    id_turno integer NOT NULL,
    id_user integer,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL,
    fotos text,
    google_maps_url text,
    status character varying(40) DEFAULT 'AGUARDANDO_AGENDAMENTO'::character varying NOT NULL,
    CONSTRAINT agendamentos_status_check CHECK (((status)::text = ANY ((ARRAY['AGUARDANDO_AGENDAMENTO'::character varying, 'VISITA_MARCADA_PARA_HOJE'::character varying, 'VISITADO'::character varying])::text[])))
);


ALTER TABLE public.agendamentos OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 3095913)
-- Name: agendamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agendamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.agendamentos_id_seq OWNER TO postgres;

--
-- TOC entry 3686 (class 0 OID 0)
-- Dependencies: 218
-- Name: agendamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agendamentos_id_seq OWNED BY public.agendamentos.id;


--
-- TOC entry 221 (class 1259 OID 3095923)
-- Name: formas_farmaceuticas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.formas_farmaceuticas (
    id integer NOT NULL,
    descricao character varying(200) NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.formas_farmaceuticas OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 3095922)
-- Name: formas_farmaceuticas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.formas_farmaceuticas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.formas_farmaceuticas_id_seq OWNER TO postgres;

--
-- TOC entry 3687 (class 0 OID 0)
-- Dependencies: 220
-- Name: formas_farmaceuticas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.formas_farmaceuticas_id_seq OWNED BY public.formas_farmaceuticas.id;


--
-- TOC entry 227 (class 1259 OID 3095950)
-- Name: lotes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lotes (
    id integer NOT NULL,
    numero character varying(50) NOT NULL,
    datavencimento timestamp(3) without time zone NOT NULL,
    datafabricacao timestamp(3) without time zone NOT NULL,
    qtde integer NOT NULL,
    id_medicamento integer NOT NULL,
    id_forma_farmaceutica integer NOT NULL,
    id_tipo_medicamento integer NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.lotes OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 3095949)
-- Name: lotes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lotes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lotes_id_seq OWNER TO postgres;

--
-- TOC entry 3688 (class 0 OID 0)
-- Dependencies: 226
-- Name: lotes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lotes_id_seq OWNED BY public.lotes.id;


--
-- TOC entry 223 (class 1259 OID 3095932)
-- Name: medicamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medicamentos (
    id integer NOT NULL,
    descricao character varying(300) NOT NULL,
    principioativo character varying(300) NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.medicamentos OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 3095931)
-- Name: medicamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medicamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medicamentos_id_seq OWNER TO postgres;

--
-- TOC entry 3689 (class 0 OID 0)
-- Dependencies: 222
-- Name: medicamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medicamentos_id_seq OWNED BY public.medicamentos.id;


--
-- TOC entry 229 (class 1259 OID 3095959)
-- Name: pacientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pacientes (
    id integer NOT NULL,
    nome character varying(200) NOT NULL,
    cpf character varying(14) NOT NULL,
    datanascimento timestamp(3) without time zone NOT NULL,
    telefone character varying(20) NOT NULL,
    cartaosus character varying(20) NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.pacientes OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 3095958)
-- Name: pacientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pacientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pacientes_id_seq OWNER TO postgres;

--
-- TOC entry 3690 (class 0 OID 0)
-- Dependencies: 228
-- Name: pacientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pacientes_id_seq OWNED BY public.pacientes.id;


--
-- TOC entry 235 (class 1259 OID 3096045)
-- Name: permissoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissoes (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    descricao character varying(500),
    pagina character varying(200),
    acao character varying(100),
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.permissoes OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 3096044)
-- Name: permissoes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permissoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permissoes_id_seq OWNER TO postgres;

--
-- TOC entry 3691 (class 0 OID 0)
-- Dependencies: 234
-- Name: permissoes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permissoes_id_seq OWNED BY public.permissoes.id;


--
-- TOC entry 231 (class 1259 OID 3095980)
-- Name: retiradas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.retiradas (
    id integer NOT NULL,
    qtde integer NOT NULL,
    id_users integer NOT NULL,
    id_lotes integer NOT NULL,
    id_pacientes integer NOT NULL,
    created timestamp(3) without time zone,
    modified timestamp(3) without time zone
);


ALTER TABLE public.retiradas OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 3095979)
-- Name: retiradas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.retiradas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.retiradas_id_seq OWNER TO postgres;

--
-- TOC entry 3692 (class 0 OID 0)
-- Dependencies: 230
-- Name: retiradas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.retiradas_id_seq OWNED BY public.retiradas.id;


--
-- TOC entry 237 (class 1259 OID 3096056)
-- Name: role_permissoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_permissoes (
    id integer NOT NULL,
    id_role integer NOT NULL,
    id_permissao integer NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.role_permissoes OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 3096055)
-- Name: role_permissoes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_permissoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_permissoes_id_seq OWNER TO postgres;

--
-- TOC entry 3693 (class 0 OID 0)
-- Dependencies: 236
-- Name: role_permissoes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_permissoes_id_seq OWNED BY public.role_permissoes.id;


--
-- TOC entry 233 (class 1259 OID 3096034)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    descricao character varying(500),
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 3096033)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 3694 (class 0 OID 0)
-- Dependencies: 232
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 241 (class 1259 OID 3096125)
-- Name: solicitacoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solicitacoes (
    id integer NOT NULL,
    qtde integer NOT NULL,
    id_lotes integer NOT NULL,
    id_pacientes integer NOT NULL,
    status character varying(30) DEFAULT 'pendente_de_aprovacao'::character varying NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL,
    foto_receita text
);


ALTER TABLE public.solicitacoes OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 3096124)
-- Name: solicitacoes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solicitacoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.solicitacoes_id_seq OWNER TO postgres;

--
-- TOC entry 3695 (class 0 OID 0)
-- Dependencies: 240
-- Name: solicitacoes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solicitacoes_id_seq OWNED BY public.solicitacoes.id;


--
-- TOC entry 225 (class 1259 OID 3095941)
-- Name: tipos_medicamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos_medicamentos (
    id integer NOT NULL,
    descricao character varying(200) NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.tipos_medicamentos OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 3095940)
-- Name: tipos_medicamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipos_medicamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipos_medicamentos_id_seq OWNER TO postgres;

--
-- TOC entry 3696 (class 0 OID 0)
-- Dependencies: 224
-- Name: tipos_medicamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_medicamentos_id_seq OWNED BY public.tipos_medicamentos.id;


--
-- TOC entry 215 (class 1259 OID 3095895)
-- Name: turnos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.turnos (
    id integer NOT NULL,
    descricao character varying(50) NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.turnos OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 3095894)
-- Name: turnos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.turnos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.turnos_id_seq OWNER TO postgres;

--
-- TOC entry 3697 (class 0 OID 0)
-- Dependencies: 214
-- Name: turnos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.turnos_id_seq OWNED BY public.turnos.id;


--
-- TOC entry 239 (class 1259 OID 3096064)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id integer NOT NULL,
    id_user integer NOT NULL,
    id_role integer NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 3096063)
-- Name: user_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_roles_id_seq OWNER TO postgres;

--
-- TOC entry 3698 (class 0 OID 0)
-- Dependencies: 238
-- Name: user_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_roles_id_seq OWNED BY public.user_roles.id;


--
-- TOC entry 217 (class 1259 OID 3095904)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(100) NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone NOT NULL,
    is_admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 3095903)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3699 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3393 (class 2604 OID 3275220)
-- Name: Agendamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Agendamentos" ALTER COLUMN id SET DEFAULT nextval('public."Agendamentos_id_seq"'::regclass);


--
-- TOC entry 3402 (class 2604 OID 3275263)
-- Name: FormasFarmaceuticas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FormasFarmaceuticas" ALTER COLUMN id SET DEFAULT nextval('public."FormasFarmaceuticas_id_seq"'::regclass);


--
-- TOC entry 3399 (class 2604 OID 3275248)
-- Name: Lotes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lotes" ALTER COLUMN id SET DEFAULT nextval('public."Lotes_id_seq"'::regclass);


--
-- TOC entry 3404 (class 2604 OID 3275271)
-- Name: Medicamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medicamentos" ALTER COLUMN id SET DEFAULT nextval('public."Medicamentos_id_seq"'::regclass);


--
-- TOC entry 3408 (class 2604 OID 3275289)
-- Name: Pacientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pacientes" ALTER COLUMN id SET DEFAULT nextval('public."Pacientes_id_seq"'::regclass);


--
-- TOC entry 3401 (class 2604 OID 3275256)
-- Name: Retiradas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Retiradas" ALTER COLUMN id SET DEFAULT nextval('public."Retiradas_id_seq"'::regclass);


--
-- TOC entry 3406 (class 2604 OID 3275281)
-- Name: TiposMedicamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TiposMedicamentos" ALTER COLUMN id SET DEFAULT nextval('public."TiposMedicamentos_id_seq"'::regclass);


--
-- TOC entry 3395 (class 2604 OID 3275230)
-- Name: Turnos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Turnos" ALTER COLUMN id SET DEFAULT nextval('public."Turnos_id_seq"'::regclass);


--
-- TOC entry 3397 (class 2604 OID 3275238)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 3366 (class 2604 OID 3095917)
-- Name: agendamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamentos ALTER COLUMN id SET DEFAULT nextval('public.agendamentos_id_seq'::regclass);


--
-- TOC entry 3369 (class 2604 OID 3095926)
-- Name: formas_farmaceuticas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formas_farmaceuticas ALTER COLUMN id SET DEFAULT nextval('public.formas_farmaceuticas_id_seq'::regclass);


--
-- TOC entry 3375 (class 2604 OID 3095953)
-- Name: lotes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lotes ALTER COLUMN id SET DEFAULT nextval('public.lotes_id_seq'::regclass);


--
-- TOC entry 3371 (class 2604 OID 3095935)
-- Name: medicamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicamentos ALTER COLUMN id SET DEFAULT nextval('public.medicamentos_id_seq'::regclass);


--
-- TOC entry 3377 (class 2604 OID 3095962)
-- Name: pacientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pacientes ALTER COLUMN id SET DEFAULT nextval('public.pacientes_id_seq'::regclass);


--
-- TOC entry 3382 (class 2604 OID 3096048)
-- Name: permissoes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissoes ALTER COLUMN id SET DEFAULT nextval('public.permissoes_id_seq'::regclass);


--
-- TOC entry 3379 (class 2604 OID 3095983)
-- Name: retiradas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retiradas ALTER COLUMN id SET DEFAULT nextval('public.retiradas_id_seq'::regclass);


--
-- TOC entry 3384 (class 2604 OID 3096059)
-- Name: role_permissoes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissoes ALTER COLUMN id SET DEFAULT nextval('public.role_permissoes_id_seq'::regclass);


--
-- TOC entry 3380 (class 2604 OID 3096037)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3388 (class 2604 OID 3096128)
-- Name: solicitacoes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitacoes ALTER COLUMN id SET DEFAULT nextval('public.solicitacoes_id_seq'::regclass);


--
-- TOC entry 3373 (class 2604 OID 3095944)
-- Name: tipos_medicamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_medicamentos ALTER COLUMN id SET DEFAULT nextval('public.tipos_medicamentos_id_seq'::regclass);


--
-- TOC entry 3361 (class 2604 OID 3095898)
-- Name: turnos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turnos ALTER COLUMN id SET DEFAULT nextval('public.turnos_id_seq'::regclass);


--
-- TOC entry 3386 (class 2604 OID 3096067)
-- Name: user_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles ALTER COLUMN id SET DEFAULT nextval('public.user_roles_id_seq'::regclass);


--
-- TOC entry 3363 (class 2604 OID 3095907)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3655 (class 0 OID 3275217)
-- Dependencies: 244
-- Data for Name: Agendamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Agendamentos" (id, nome, endereco, numero, setor, cep, telefone, datavisita, id_turno, id_user, created, modified) FROM stdin;
\.


--
-- TOC entry 3665 (class 0 OID 3275260)
-- Dependencies: 254
-- Data for Name: FormasFarmaceuticas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FormasFarmaceuticas" (id, descricao, created, modified) FROM stdin;
\.


--
-- TOC entry 3661 (class 0 OID 3275245)
-- Dependencies: 250
-- Data for Name: Lotes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Lotes" (id, numero, datavencimento, datafabricacao, qdte, id_medicamento, id_forma_farmaceutica, id_tipo_medicamento, created, modified) FROM stdin;
\.


--
-- TOC entry 3667 (class 0 OID 3275268)
-- Dependencies: 256
-- Data for Name: Medicamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Medicamentos" (id, descricao, principioativo, created, modified) FROM stdin;
\.


--
-- TOC entry 3671 (class 0 OID 3275286)
-- Dependencies: 260
-- Data for Name: Pacientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Pacientes" (id, nome, cpf, datanascimento, telefone, cartaosus, created, modified) FROM stdin;
\.


--
-- TOC entry 3663 (class 0 OID 3275253)
-- Dependencies: 252
-- Data for Name: Retiradas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Retiradas" (id, qtde, id_users, id_lotes, id_pacientes, created, modified) FROM stdin;
\.


--
-- TOC entry 3669 (class 0 OID 3275278)
-- Dependencies: 258
-- Data for Name: TiposMedicamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TiposMedicamentos" (id, descricao, created, modified) FROM stdin;
\.


--
-- TOC entry 3657 (class 0 OID 3275227)
-- Dependencies: 246
-- Data for Name: Turnos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Turnos" (id, descricao, created, modified) FROM stdin;
\.


--
-- TOC entry 3659 (class 0 OID 3275235)
-- Dependencies: 248
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, username, email, password, role, created, modified) FROM stdin;
\.


--
-- TOC entry 3653 (class 0 OID 3096236)
-- Dependencies: 242
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
9bbcc0cf-174c-4ff5-8cc9-08d1cce7999c	aaf27d9bcf327dda035df8ee5581d9e88ce72ed3a32e2df9a624e686f4de02bc	2026-01-22 08:04:06.644779-03	add_fotos_field_agendamentos		\N	2026-01-22 08:04:06.644779-03	0
771aef7a-fb78-4219-b1f7-9bd23d07358c	75093e25820b20c3ec7b956bcee2797adaaaaee16ebd2b1164e3694574a6cef3	\N	20250106190000_add_permissions_system	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20250106190000_add_permissions_system\n\nDatabase error code: 42710\n\nDatabase error:\nERROR: constraint "role_permissoes_id_role_fkey" for relation "role_permissoes" already exists\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E42710), message: "constraint \\"role_permissoes_id_role_fkey\\" for relation \\"role_permissoes\\" already exists", detail: None, hint: None, position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("tablecmds.c"), line: Some(8970), routine: Some("ATExecAddConstraint") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20250106190000_add_permissions_system"\n             at schema-engine/connectors/sql-schema-connector/src/apply_migration.rs:113\n   1: schema_commands::commands::apply_migrations::Applying migration\n           with migration_name="20250106190000_add_permissions_system"\n             at schema-engine/commands/src/commands/apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine/core/src/state.rs:236	2026-03-26 16:59:04.103624-03	2026-03-26 16:58:48.629263-03	0
19d20a66-73b3-4c01-8f63-f7ca9bc7e09a	75093e25820b20c3ec7b956bcee2797adaaaaee16ebd2b1164e3694574a6cef3	2026-03-26 16:59:04.114469-03	20250106190000_add_permissions_system		\N	2026-03-26 16:59:04.114469-03	0
5f4117ff-128d-43d9-bc8a-f91aca551d5b	b60dd1e4dba6f3449c31ed712735079969418981b2e386a10c56822839279dfb	2026-03-26 16:59:12.500652-03	20250528233822_remed_migration	\N	\N	2026-03-26 16:59:12.460546-03	1
\.


--
-- TOC entry 3630 (class 0 OID 3095914)
-- Dependencies: 219
-- Data for Name: agendamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agendamentos (id, nome, endereco, numero, setor, cep, telefone, datavisita, id_turno, id_user, created, modified, fotos, google_maps_url, status) FROM stdin;
7	Teste foto	sdfsdfsf	500	cimba	44557777	6654544444	Terça	1	\N	2026-01-22 11:29:28.246	2026-01-22 11:29:28.246	["/uploads/agendamentos/foto-1769081368225-243920526.jpg","/uploads/agendamentos/foto-1769081368234-364588370.png","/uploads/agendamentos/foto-1769081368241-250098483.jpg"]	\N	AGUARDANDO_AGENDAMENTO
8	Teste foto e mapa	sdfsf	4444	cslkdlf	77777777	7777777777	quarta	1	\N	2026-01-22 12:07:37.142	2026-01-22 12:07:37.142	["/uploads/agendamentos/foto-1769083657050-947366175.jpeg","/uploads/agendamentos/foto-1769083657050-873438952.jpeg","/uploads/agendamentos/foto-1769083657051-378260172.jpeg"]	https://maps.app.goo.gl/Yxfk8dtNBvMVGTQG7	AGUARDANDO_AGENDAMENTO
3	wwwwwww	wwwwww	22	wwwwwwww	222222	2222222	wwwwwwww	2	1	2025-12-26 18:24:42.799	2026-01-09 19:39:47.907	\N	\N	VISITADO
1	Teste	ddffdd	55555	dddd	5555555	666666666	sdfdfdfff	2	1	2025-12-26 18:10:17.149	2026-03-26 20:19:59.365	\N	\N	VISITADO
4	Fernando	Rua 3	3	cimba	88888888	63992218920	terça	2	1	2025-12-26 20:47:23.639	2026-03-26 20:23:18.378	\N	\N	VISITADO
5	teste hahaha2	sdfsdf	555555	sdfsdfd	88555444	55555555	ksdlfksdlf3	1	\N	2026-01-09 20:53:32.266	2026-03-26 21:23:46.931	\N	\N	AGUARDANDO_AGENDAMENTO
\.


--
-- TOC entry 3632 (class 0 OID 3095923)
-- Dependencies: 221
-- Data for Name: formas_farmaceuticas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.formas_farmaceuticas (id, descricao, created, modified) FROM stdin;
1	Comprimidos	2025-12-26 14:42:23.787	2025-12-26 14:42:23.787
2	Cápsulas	2025-12-26 14:42:23.787	2025-12-26 14:42:23.787
3	Xaropes	2025-12-26 14:42:23.787	2025-12-26 14:42:23.787
4	Pílulas de dissolução rápida	2025-12-26 14:42:23.787	2025-12-26 14:42:23.787
5	Patches transdérmicos	2025-12-26 14:42:23.787	2025-12-26 14:42:23.787
6	Soluções orais	2025-12-26 14:42:23.787	2025-12-26 14:42:23.787
\.


--
-- TOC entry 3638 (class 0 OID 3095950)
-- Dependencies: 227
-- Data for Name: lotes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lotes (id, numero, datavencimento, datafabricacao, qtde, id_medicamento, id_forma_farmaceutica, id_tipo_medicamento, created, modified) FROM stdin;
3	00006544472	2025-05-26 00:00:00	2022-05-22 00:00:00	10	3	2	1	2026-01-12 13:34:17.682	2026-01-12 19:49:16.047
1	000001124	2028-10-30 00:00:00	2025-01-20 00:00:00	1000	1	1	1	2026-01-12 13:17:58.937	2026-01-23 20:24:16.912
2	000225446	2026-03-10 00:00:00	2025-11-05 00:00:00	990	2	1	1	2026-01-12 13:22:09.197	2026-01-23 20:57:49.844
\.


--
-- TOC entry 3634 (class 0 OID 3095932)
-- Dependencies: 223
-- Data for Name: medicamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.medicamentos (id, descricao, principioativo, created, modified) FROM stdin;
2	Doril	Ácido acetilsalicílico	2023-10-17 13:39:07	2023-12-19 13:22:06
3	Paracetamol	Paracetamol	2023-10-17 13:40:51	2023-11-04 17:56:42
1	Dipirona	Dipirona monoidratada	2023-10-17 00:55:20	2026-01-12 14:03:37.886
\.


--
-- TOC entry 3640 (class 0 OID 3095959)
-- Dependencies: 229
-- Data for Name: pacientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pacientes (id, nome, cpf, datanascimento, telefone, cartaosus, created, modified) FROM stdin;
2	Léticia Feitosa de Moura Arantes	12454545454	2020-06-11 00:00:00	63992218920	554545454545	2026-01-12 19:12:35.952	2026-01-12 19:12:35.952
3	Livia Feitosa Arantes	12121453121	2022-05-17 00:00:00	63992218920	5545455454545	2026-01-12 19:16:58.665	2026-01-12 19:16:58.665
4	Teste	65447844445	1990-12-04 00:00:00	63999554477	5454545487884545	2026-01-14 14:53:26.328	2026-01-14 14:53:26.328
\.


--
-- TOC entry 3646 (class 0 OID 3096045)
-- Dependencies: 235
-- Data for Name: permissoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissoes (id, nome, descricao, pagina, acao, created, modified) FROM stdin;
1	agendamentos.ver	Ver agendamentos	Agendamentos	ver	2026-01-12 17:38:19.058	2026-01-12 17:38:19.058
2	agendamentos.criar	Criar agendamentos	Agendamentos	criar	2026-01-12 17:38:19.058	2026-01-12 17:38:19.058
3	agendamentos.editar	Editar agendamentos	Agendamentos	editar	2026-01-12 17:38:19.058	2026-01-12 17:38:19.058
4	agendamentos.excluir	Excluir agendamentos	Agendamentos	excluir	2026-01-12 17:38:19.058	2026-01-12 17:38:19.058
5	agendamentos.visitar	Marcar agendamento como visitado	Agendamentos	visitar	2026-01-12 17:38:19.058	2026-01-12 17:38:19.058
6	medicamentos.ver	Ver medicamentos	Medicamentos	ver	2026-01-12 17:38:19.07	2026-01-12 17:38:19.07
7	medicamentos.criar	Criar medicamentos	Medicamentos	criar	2026-01-12 17:38:19.07	2026-01-12 17:38:19.07
8	medicamentos.editar	Editar medicamentos	Medicamentos	editar	2026-01-12 17:38:19.07	2026-01-12 17:38:19.07
9	medicamentos.excluir	Excluir medicamentos	Medicamentos	excluir	2026-01-12 17:38:19.07	2026-01-12 17:38:19.07
10	lotes.ver	Ver lotes	Lotes	ver	2026-01-12 17:38:19.07	2026-01-12 17:38:19.07
11	lotes.criar	Criar lotes	Lotes	criar	2026-01-12 17:38:19.07	2026-01-12 17:38:19.07
12	lotes.editar	Editar lotes	Lotes	editar	2026-01-12 17:38:19.07	2026-01-12 17:38:19.07
13	lotes.excluir	Excluir lotes	Lotes	excluir	2026-01-12 17:38:19.07	2026-01-12 17:38:19.07
14	lotes.doar	Doar medicamentos	Lotes	doar	2026-01-12 17:38:19.07	2026-01-12 17:38:19.07
15	pacientes.ver	Ver pacientes	Pacientes	ver	2026-01-12 17:38:19.071	2026-01-12 17:38:19.071
16	pacientes.criar	Criar pacientes	Pacientes	criar	2026-01-12 17:38:19.071	2026-01-12 17:38:19.071
17	pacientes.editar	Editar pacientes	Pacientes	editar	2026-01-12 17:38:19.071	2026-01-12 17:38:19.071
18	pacientes.excluir	Excluir pacientes	Pacientes	excluir	2026-01-12 17:38:19.071	2026-01-12 17:38:19.071
19	pacientes.doar	Doar para pacientes	Pacientes	doar	2026-01-12 17:38:19.071	2026-01-12 17:38:19.071
20	retiradas.ver	Ver retiradas/doações	Retiradas	ver	2026-01-12 17:38:19.071	2026-01-12 17:38:19.071
21	retiradas.criar	Criar retiradas/doações	Retiradas	criar	2026-01-12 17:38:19.071	2026-01-12 17:38:19.071
22	retiradas.editar	Editar retiradas/doações	Retiradas	editar	2026-01-12 17:38:19.071	2026-01-12 17:38:19.071
23	retiradas.excluir	Excluir retiradas/doações	Retiradas	excluir	2026-01-12 17:38:19.071	2026-01-12 17:38:19.071
24	tipos_medicamentos.ver	Ver tipos de medicamentos	Tipos de Medicamentos	ver	2026-01-12 17:38:19.072	2026-01-12 17:38:19.072
25	tipos_medicamentos.criar	Criar tipos de medicamentos	Tipos de Medicamentos	criar	2026-01-12 17:38:19.072	2026-01-12 17:38:19.072
26	tipos_medicamentos.editar	Editar tipos de medicamentos	Tipos de Medicamentos	editar	2026-01-12 17:38:19.072	2026-01-12 17:38:19.072
27	tipos_medicamentos.excluir	Excluir tipos de medicamentos	Tipos de Medicamentos	excluir	2026-01-12 17:38:19.072	2026-01-12 17:38:19.072
28	formas_farmaceuticas.ver	Ver formas farmacêuticas	Formas Farmacêuticas	ver	2026-01-12 17:38:19.072	2026-01-12 17:38:19.072
29	formas_farmaceuticas.criar	Criar formas farmacêuticas	Formas Farmacêuticas	criar	2026-01-12 17:38:19.072	2026-01-12 17:38:19.072
30	formas_farmaceuticas.editar	Editar formas farmacêuticas	Formas Farmacêuticas	editar	2026-01-12 17:38:19.072	2026-01-12 17:38:19.072
31	formas_farmaceuticas.excluir	Excluir formas farmacêuticas	Formas Farmacêuticas	excluir	2026-01-12 17:38:19.072	2026-01-12 17:38:19.072
32	usuarios.ver	Ver usuários	Usuários	ver	2026-01-12 17:38:19.073	2026-01-12 17:38:19.073
33	usuarios.criar	Criar usuários	Usuários	criar	2026-01-12 17:38:19.073	2026-01-12 17:38:19.073
34	usuarios.editar	Editar usuários	Usuários	editar	2026-01-12 17:38:19.073	2026-01-12 17:38:19.073
35	usuarios.excluir	Excluir usuários	Usuários	excluir	2026-01-12 17:38:19.073	2026-01-12 17:38:19.073
36	permissoes.gerenciar	Gerenciar permissões e roles	Permissões	gerenciar	2026-01-12 17:38:19.074	2026-01-12 17:38:19.074
37	solicitacoes.ver	Ver solicitações	Solicitações	ver	2026-01-14 18:29:40.956	2026-01-14 18:29:40.956
38	solicitacoes.confirmar	Confirmar solicitações	Solicitações	confirmar	2026-01-14 18:29:40.956	2026-01-14 18:29:40.956
39	solicitacoes.recusar	Recusar solicitações	Solicitações	recusar	2026-01-14 18:29:40.956	2026-01-14 18:29:40.956
\.


--
-- TOC entry 3642 (class 0 OID 3095980)
-- Dependencies: 231
-- Data for Name: retiradas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.retiradas (id, qtde, id_users, id_lotes, id_pacientes, created, modified) FROM stdin;
9	10	1	2	2	2026-01-23 20:57:49.837	2026-01-23 20:57:49.837
\.


--
-- TOC entry 3648 (class 0 OID 3096056)
-- Dependencies: 237
-- Data for Name: role_permissoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_permissoes (id, id_role, id_permissao, created) FROM stdin;
1	3	2	2026-01-13 18:49:31.801
2	3	3	2026-01-13 18:49:31.801
3	3	4	2026-01-13 18:49:31.801
4	3	1	2026-01-13 18:49:31.801
5	3	5	2026-01-13 18:49:31.801
6	3	29	2026-01-13 18:49:31.801
7	3	30	2026-01-13 18:49:31.801
8	3	31	2026-01-13 18:49:31.801
9	3	28	2026-01-13 18:49:31.801
10	3	11	2026-01-13 18:49:31.801
11	3	14	2026-01-13 18:49:31.801
12	3	12	2026-01-13 18:49:31.801
13	3	13	2026-01-13 18:49:31.801
14	3	10	2026-01-13 18:49:31.801
15	3	7	2026-01-13 18:49:31.801
16	3	8	2026-01-13 18:49:31.801
17	3	9	2026-01-13 18:49:31.801
18	3	6	2026-01-13 18:49:31.801
19	3	16	2026-01-13 18:49:31.801
20	3	19	2026-01-13 18:49:31.801
21	3	17	2026-01-13 18:49:31.801
22	3	18	2026-01-13 18:49:31.801
23	3	15	2026-01-13 18:49:31.801
24	3	36	2026-01-13 18:49:31.801
25	3	21	2026-01-13 18:49:31.801
26	3	22	2026-01-13 18:49:31.801
27	3	23	2026-01-13 18:49:31.801
28	3	20	2026-01-13 18:49:31.801
29	3	25	2026-01-13 18:49:31.801
30	3	26	2026-01-13 18:49:31.801
31	3	27	2026-01-13 18:49:31.801
32	3	24	2026-01-13 18:49:31.801
33	3	33	2026-01-13 18:49:31.801
34	3	34	2026-01-13 18:49:31.801
35	3	35	2026-01-13 18:49:31.801
36	3	32	2026-01-13 18:49:31.801
132	2	1	2026-01-14 11:43:29.994
133	2	5	2026-01-14 11:43:29.994
134	2	2	2026-01-14 11:43:29.994
135	2	3	2026-01-14 11:43:29.994
354	4	2	2026-01-14 12:37:55.498
355	4	3	2026-01-14 12:37:55.498
356	4	1	2026-01-14 12:37:55.498
357	4	5	2026-01-14 12:37:55.498
358	4	28	2026-01-14 12:37:55.498
359	4	14	2026-01-14 12:37:55.498
360	4	10	2026-01-14 12:37:55.498
361	4	6	2026-01-14 12:37:55.498
362	4	16	2026-01-14 12:37:55.498
363	4	19	2026-01-14 12:37:55.498
364	4	17	2026-01-14 12:37:55.498
365	4	18	2026-01-14 12:37:55.498
366	4	15	2026-01-14 12:37:55.498
367	4	21	2026-01-14 12:37:55.498
368	4	22	2026-01-14 12:37:55.498
369	4	23	2026-01-14 12:37:55.498
370	4	20	2026-01-14 12:37:55.498
371	4	24	2026-01-14 12:37:55.498
323	1	2	2026-01-14 12:20:54.492
324	1	1	2026-01-14 12:20:54.492
325	1	5	2026-01-14 12:20:54.492
326	1	4	2026-01-14 12:20:54.492
327	1	3	2026-01-14 12:20:54.492
328	1	16	2026-01-14 12:20:54.492
329	1	17	2026-01-14 12:20:54.492
330	1	18	2026-01-14 12:20:54.492
331	1	15	2026-01-14 12:20:54.492
332	1	19	2026-01-14 12:20:54.492
333	1	21	2026-01-14 12:20:54.492
334	1	22	2026-01-14 12:20:54.492
335	1	23	2026-01-14 12:20:54.492
336	1	20	2026-01-14 12:20:54.492
337	1	10	2026-01-14 12:20:54.492
338	1	14	2026-01-14 12:20:54.492
339	1	28	2026-01-14 12:20:54.492
340	1	31	2026-01-14 12:20:54.492
341	1	30	2026-01-14 12:20:54.492
342	1	29	2026-01-14 12:20:54.492
343	1	8	2026-01-14 12:20:54.492
344	1	6	2026-01-14 12:20:54.492
345	1	7	2026-01-14 12:20:54.492
346	1	25	2026-01-14 12:20:54.492
347	1	26	2026-01-14 12:20:54.492
348	1	27	2026-01-14 12:20:54.492
349	1	24	2026-01-14 12:20:54.492
350	1	13	2026-01-14 12:20:54.492
351	1	12	2026-01-14 12:20:54.492
352	1	11	2026-01-14 12:20:54.492
353	1	9	2026-01-14 12:20:54.492
\.


--
-- TOC entry 3644 (class 0 OID 3096034)
-- Dependencies: 233
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, nome, descricao, created, modified) FROM stdin;
2	Agente de saúde	Coletar medicamentos e visitar agendamentos	2026-01-13 11:55:30.189	2026-01-13 11:55:30.189
1	Farmaceuticos	Receber os medicamentos, realizar triagens e doações.	2026-01-12 21:10:41.741	2026-01-13 12:23:00.645
3	Administrador	Acesso completo ao sistema.	2026-01-13 12:23:33.348	2026-01-13 12:23:33.348
4	Atendente	Pode gerenciar pacientes, doar medicamentos.	2026-01-14 12:35:56.818	2026-01-14 12:39:04.79
\.


--
-- TOC entry 3652 (class 0 OID 3096125)
-- Dependencies: 241
-- Data for Name: solicitacoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solicitacoes (id, qtde, id_lotes, id_pacientes, status, created, modified, foto_receita) FROM stdin;
11	10	1	2	recusada	2026-01-23 20:55:59.078	2026-01-23 20:57:18.784	/uploads/receitas/receita-1769201759074-874214836.png
10	10	2	2	retirada_concluida	2026-01-23 20:54:35.889	2026-01-23 20:57:49.845	/uploads/receitas/receita-1769201675879-520634470.png
12	10	1	2	aprovado_para_retirada	2026-01-23 20:59:20.452	2026-01-23 21:00:49.423	/uploads/receitas/receita-1769201960437-748723375.png
13	10	1	2	pendente_de_aprovacao	2026-01-23 21:01:10.111	2026-01-23 21:01:10.111	/uploads/receitas/receita-1769202070100-46267560.png
\.


--
-- TOC entry 3636 (class 0 OID 3095941)
-- Dependencies: 225
-- Data for Name: tipos_medicamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipos_medicamentos (id, descricao, created, modified) FROM stdin;
1	Analgésicos	2025-12-26 14:47:51.505	2025-12-26 14:47:51.505
2	Antibióticos	2025-12-26 14:47:51.505	2025-12-26 14:47:51.505
3	Antivirais	2025-12-26 14:47:51.505	2025-12-26 14:47:51.505
4	Anti-inflamatórios	2025-12-26 14:47:51.505	2025-12-26 14:47:51.505
5	Antifúngicos	2025-12-26 14:47:51.505	2025-12-26 14:47:51.505
6	Antiparasitários	2025-12-26 14:47:51.505	2025-12-26 14:47:51.505
\.


--
-- TOC entry 3626 (class 0 OID 3095895)
-- Dependencies: 215
-- Data for Name: turnos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.turnos (id, descricao, created, modified) FROM stdin;
1	Matutino	2025-12-26 14:48:29.552	2025-12-26 14:48:29.552
2	Vespertino	2025-12-26 14:48:29.552	2025-12-26 14:48:29.552
\.


--
-- TOC entry 3650 (class 0 OID 3096064)
-- Dependencies: 239
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (id, id_user, id_role, created) FROM stdin;
1	1	3	2026-01-13 18:50:23.228
3	4	1	2026-01-13 20:56:20.082
5	5	4	2026-01-14 12:40:34.033
6	3	2	2026-01-14 12:41:01.323
\.


--
-- TOC entry 3628 (class 0 OID 3095904)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, created, modified, is_admin) FROM stdin;
1	fernando	fernando.algaworks@gmail.com	$2b$10$HB3vyqkTMZXK2A7bckRpxelGfK5z7Loj73mDXUbQv8DYu67.lKe0e	2025-12-30 20:35:13.929	2026-01-13 18:50:23.236	t
4	farmacia	farmacia@gmail.com	$2b$10$ZE6GrMpMB6Wn/CiiBczaleKdWTTh.V1u4A2MNqI.b5Eo.AImMYT8y	2026-01-13 20:56:20.079	2026-01-13 20:56:20.079	f
5	atendente	atendente@gmail.com	$2b$10$Mcu7M3Pf5hp96S97mSqjVu.PNEVk2DDpmMKpJdJs/GNLqc1WeYoc6	2026-01-14 12:40:04.625	2026-01-14 12:40:34.018	f
3	agente	agente@gmail.com	$2b$10$1QfCmAc0R3tES5o6kVYiuuw9S3tXF1jF/ZlA69RkK03BWvQxE9vi.	2026-01-13 18:59:01.051	2026-01-14 12:41:01.32	f
\.


--
-- TOC entry 3700 (class 0 OID 0)
-- Dependencies: 243
-- Name: Agendamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Agendamentos_id_seq"', 1, false);


--
-- TOC entry 3701 (class 0 OID 0)
-- Dependencies: 253
-- Name: FormasFarmaceuticas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."FormasFarmaceuticas_id_seq"', 1, false);


--
-- TOC entry 3702 (class 0 OID 0)
-- Dependencies: 249
-- Name: Lotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Lotes_id_seq"', 1, false);


--
-- TOC entry 3703 (class 0 OID 0)
-- Dependencies: 255
-- Name: Medicamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Medicamentos_id_seq"', 1, false);


--
-- TOC entry 3704 (class 0 OID 0)
-- Dependencies: 259
-- Name: Pacientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Pacientes_id_seq"', 1, false);


--
-- TOC entry 3705 (class 0 OID 0)
-- Dependencies: 251
-- Name: Retiradas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Retiradas_id_seq"', 1, false);


--
-- TOC entry 3706 (class 0 OID 0)
-- Dependencies: 257
-- Name: TiposMedicamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TiposMedicamentos_id_seq"', 1, false);


--
-- TOC entry 3707 (class 0 OID 0)
-- Dependencies: 245
-- Name: Turnos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Turnos_id_seq"', 1, false);


--
-- TOC entry 3708 (class 0 OID 0)
-- Dependencies: 247
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, false);


--
-- TOC entry 3709 (class 0 OID 0)
-- Dependencies: 218
-- Name: agendamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agendamentos_id_seq', 8, true);


--
-- TOC entry 3710 (class 0 OID 0)
-- Dependencies: 220
-- Name: formas_farmaceuticas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.formas_farmaceuticas_id_seq', 9, true);


--
-- TOC entry 3711 (class 0 OID 0)
-- Dependencies: 226
-- Name: lotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lotes_id_seq', 3, true);


--
-- TOC entry 3712 (class 0 OID 0)
-- Dependencies: 222
-- Name: medicamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medicamentos_id_seq', 4, true);


--
-- TOC entry 3713 (class 0 OID 0)
-- Dependencies: 228
-- Name: pacientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pacientes_id_seq', 4, true);


--
-- TOC entry 3714 (class 0 OID 0)
-- Dependencies: 234
-- Name: permissoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permissoes_id_seq', 39, true);


--
-- TOC entry 3715 (class 0 OID 0)
-- Dependencies: 230
-- Name: retiradas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.retiradas_id_seq', 9, true);


--
-- TOC entry 3716 (class 0 OID 0)
-- Dependencies: 236
-- Name: role_permissoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_permissoes_id_seq', 371, true);


--
-- TOC entry 3717 (class 0 OID 0)
-- Dependencies: 232
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 4, true);


--
-- TOC entry 3718 (class 0 OID 0)
-- Dependencies: 240
-- Name: solicitacoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitacoes_id_seq', 13, true);


--
-- TOC entry 3719 (class 0 OID 0)
-- Dependencies: 224
-- Name: tipos_medicamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_medicamentos_id_seq', 8, true);


--
-- TOC entry 3720 (class 0 OID 0)
-- Dependencies: 214
-- Name: turnos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.turnos_id_seq', 2, true);


--
-- TOC entry 3721 (class 0 OID 0)
-- Dependencies: 238
-- Name: user_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_roles_id_seq', 6, true);


--
-- TOC entry 3722 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- TOC entry 3444 (class 2606 OID 3275225)
-- Name: Agendamentos Agendamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Agendamentos"
    ADD CONSTRAINT "Agendamentos_pkey" PRIMARY KEY (id);


--
-- TOC entry 3454 (class 2606 OID 3275266)
-- Name: FormasFarmaceuticas FormasFarmaceuticas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FormasFarmaceuticas"
    ADD CONSTRAINT "FormasFarmaceuticas_pkey" PRIMARY KEY (id);


--
-- TOC entry 3450 (class 2606 OID 3275251)
-- Name: Lotes Lotes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lotes"
    ADD CONSTRAINT "Lotes_pkey" PRIMARY KEY (id);


--
-- TOC entry 3456 (class 2606 OID 3275276)
-- Name: Medicamentos Medicamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medicamentos"
    ADD CONSTRAINT "Medicamentos_pkey" PRIMARY KEY (id);


--
-- TOC entry 3460 (class 2606 OID 3275292)
-- Name: Pacientes Pacientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pacientes"
    ADD CONSTRAINT "Pacientes_pkey" PRIMARY KEY (id);


--
-- TOC entry 3452 (class 2606 OID 3275258)
-- Name: Retiradas Retiradas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Retiradas"
    ADD CONSTRAINT "Retiradas_pkey" PRIMARY KEY (id);


--
-- TOC entry 3458 (class 2606 OID 3275284)
-- Name: TiposMedicamentos TiposMedicamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TiposMedicamentos"
    ADD CONSTRAINT "TiposMedicamentos_pkey" PRIMARY KEY (id);


--
-- TOC entry 3446 (class 2606 OID 3275233)
-- Name: Turnos Turnos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Turnos"
    ADD CONSTRAINT "Turnos_pkey" PRIMARY KEY (id);


--
-- TOC entry 3448 (class 2606 OID 3275243)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3442 (class 2606 OID 3096244)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3416 (class 2606 OID 3095921)
-- Name: agendamentos agendamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamentos
    ADD CONSTRAINT agendamentos_pkey PRIMARY KEY (id);


--
-- TOC entry 3418 (class 2606 OID 3095930)
-- Name: formas_farmaceuticas formas_farmaceuticas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formas_farmaceuticas
    ADD CONSTRAINT formas_farmaceuticas_pkey PRIMARY KEY (id);


--
-- TOC entry 3424 (class 2606 OID 3095957)
-- Name: lotes lotes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT lotes_pkey PRIMARY KEY (id);


--
-- TOC entry 3420 (class 2606 OID 3095939)
-- Name: medicamentos medicamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicamentos
    ADD CONSTRAINT medicamentos_pkey PRIMARY KEY (id);


--
-- TOC entry 3426 (class 2606 OID 3095966)
-- Name: pacientes pacientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (id);


--
-- TOC entry 3432 (class 2606 OID 3096054)
-- Name: permissoes permissoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissoes
    ADD CONSTRAINT permissoes_pkey PRIMARY KEY (id);


--
-- TOC entry 3428 (class 2606 OID 3095985)
-- Name: retiradas retiradas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retiradas
    ADD CONSTRAINT retiradas_pkey PRIMARY KEY (id);


--
-- TOC entry 3435 (class 2606 OID 3096062)
-- Name: role_permissoes role_permissoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissoes
    ADD CONSTRAINT role_permissoes_pkey PRIMARY KEY (id);


--
-- TOC entry 3430 (class 2606 OID 3096043)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3440 (class 2606 OID 3096133)
-- Name: solicitacoes solicitacoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitacoes
    ADD CONSTRAINT solicitacoes_pkey PRIMARY KEY (id);


--
-- TOC entry 3422 (class 2606 OID 3095948)
-- Name: tipos_medicamentos tipos_medicamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_medicamentos
    ADD CONSTRAINT tipos_medicamentos_pkey PRIMARY KEY (id);


--
-- TOC entry 3412 (class 2606 OID 3095902)
-- Name: turnos turnos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turnos
    ADD CONSTRAINT turnos_pkey PRIMARY KEY (id);


--
-- TOC entry 3438 (class 2606 OID 3096070)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3414 (class 2606 OID 3095912)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3433 (class 1259 OID 3096071)
-- Name: role_permissoes_id_role_id_permissao_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX role_permissoes_id_role_id_permissao_key ON public.role_permissoes USING btree (id_role, id_permissao);


--
-- TOC entry 3436 (class 1259 OID 3096072)
-- Name: user_roles_id_user_id_role_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_roles_id_user_id_role_key ON public.user_roles USING btree (id_user, id_role);


--
-- TOC entry 3475 (class 2606 OID 3275293)
-- Name: Agendamentos Agendamentos_id_turno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Agendamentos"
    ADD CONSTRAINT "Agendamentos_id_turno_fkey" FOREIGN KEY (id_turno) REFERENCES public."Turnos"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3476 (class 2606 OID 3275298)
-- Name: Agendamentos Agendamentos_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Agendamentos"
    ADD CONSTRAINT "Agendamentos_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3477 (class 2606 OID 3275303)
-- Name: Lotes Lotes_id_forma_farmaceutica_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lotes"
    ADD CONSTRAINT "Lotes_id_forma_farmaceutica_fkey" FOREIGN KEY (id_forma_farmaceutica) REFERENCES public."FormasFarmaceuticas"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3478 (class 2606 OID 3275308)
-- Name: Lotes Lotes_id_medicamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lotes"
    ADD CONSTRAINT "Lotes_id_medicamento_fkey" FOREIGN KEY (id_medicamento) REFERENCES public."Medicamentos"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3479 (class 2606 OID 3275313)
-- Name: Lotes Lotes_id_tipo_medicamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lotes"
    ADD CONSTRAINT "Lotes_id_tipo_medicamento_fkey" FOREIGN KEY (id_tipo_medicamento) REFERENCES public."TiposMedicamentos"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3480 (class 2606 OID 3275323)
-- Name: Retiradas Retiradas_id_lotes_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Retiradas"
    ADD CONSTRAINT "Retiradas_id_lotes_fkey" FOREIGN KEY (id_lotes) REFERENCES public."Lotes"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3481 (class 2606 OID 3275328)
-- Name: Retiradas Retiradas_id_pacientes_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Retiradas"
    ADD CONSTRAINT "Retiradas_id_pacientes_fkey" FOREIGN KEY (id_pacientes) REFERENCES public."Pacientes"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3482 (class 2606 OID 3275318)
-- Name: Retiradas Retiradas_id_users_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Retiradas"
    ADD CONSTRAINT "Retiradas_id_users_fkey" FOREIGN KEY (id_users) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3461 (class 2606 OID 3096196)
-- Name: agendamentos agendamentos_id_turno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamentos
    ADD CONSTRAINT agendamentos_id_turno_fkey FOREIGN KEY (id_turno) REFERENCES public.turnos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3462 (class 2606 OID 3096201)
-- Name: agendamentos agendamentos_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamentos
    ADD CONSTRAINT agendamentos_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3463 (class 2606 OID 3096206)
-- Name: lotes lotes_id_forma_farmaceutica_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT lotes_id_forma_farmaceutica_fkey FOREIGN KEY (id_forma_farmaceutica) REFERENCES public.formas_farmaceuticas(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3464 (class 2606 OID 3096211)
-- Name: lotes lotes_id_medicamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT lotes_id_medicamento_fkey FOREIGN KEY (id_medicamento) REFERENCES public.medicamentos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3465 (class 2606 OID 3096216)
-- Name: lotes lotes_id_tipo_medicamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT lotes_id_tipo_medicamento_fkey FOREIGN KEY (id_tipo_medicamento) REFERENCES public.tipos_medicamentos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3466 (class 2606 OID 3096226)
-- Name: retiradas retiradas_id_lotes_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retiradas
    ADD CONSTRAINT retiradas_id_lotes_fkey FOREIGN KEY (id_lotes) REFERENCES public.lotes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3467 (class 2606 OID 3096231)
-- Name: retiradas retiradas_id_pacientes_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retiradas
    ADD CONSTRAINT retiradas_id_pacientes_fkey FOREIGN KEY (id_pacientes) REFERENCES public.pacientes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3468 (class 2606 OID 3096221)
-- Name: retiradas retiradas_id_users_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retiradas
    ADD CONSTRAINT retiradas_id_users_fkey FOREIGN KEY (id_users) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3469 (class 2606 OID 3096078)
-- Name: role_permissoes role_permissoes_id_permissao_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissoes
    ADD CONSTRAINT role_permissoes_id_permissao_fkey FOREIGN KEY (id_permissao) REFERENCES public.permissoes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3470 (class 2606 OID 3096073)
-- Name: role_permissoes role_permissoes_id_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissoes
    ADD CONSTRAINT role_permissoes_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3473 (class 2606 OID 3096134)
-- Name: solicitacoes solicitacoes_id_lotes_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitacoes
    ADD CONSTRAINT solicitacoes_id_lotes_fkey FOREIGN KEY (id_lotes) REFERENCES public.lotes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3474 (class 2606 OID 3096139)
-- Name: solicitacoes solicitacoes_id_pacientes_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitacoes
    ADD CONSTRAINT solicitacoes_id_pacientes_fkey FOREIGN KEY (id_pacientes) REFERENCES public.pacientes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3471 (class 2606 OID 3096088)
-- Name: user_roles user_roles_id_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3472 (class 2606 OID 3096083)
-- Name: user_roles user_roles_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-03-26 18:31:21 -03

--
-- PostgreSQL database dump complete
--

\unrestrict dPb9bUdNHjiRlGKgTPreSjc4zu5OMayZNmyyw9irEXUcSOT4NRIy4VvyGftaWOb

