PGDMP         2    
            }            remed %   14.18 (Ubuntu 14.18-0ubuntu0.22.04.1) %   14.18 (Ubuntu 14.18-0ubuntu0.22.04.1) b    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16651    remed    DATABASE     Z   CREATE DATABASE remed WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'pt_BR.UTF-8';
    DROP DATABASE remed;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            �            1259    16717    agendamentos    TABLE     �  CREATE TABLE public.agendamentos (
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
    created timestamp without time zone NOT NULL,
    modified timestamp without time zone NOT NULL
);
     DROP TABLE public.agendamentos;
       public         heap    postgres    false    3            �            1259    16716    agendamentos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.agendamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.agendamentos_id_seq;
       public          postgres    false    3    222            �           0    0    agendamentos_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.agendamentos_id_seq OWNED BY public.agendamentos.id;
          public          postgres    false    221            �            1259    16662    formas_farmaceuticas    TABLE       CREATE TABLE public.formas_farmaceuticas (
    id integer NOT NULL,
    descricao character varying(200) NOT NULL,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 (   DROP TABLE public.formas_farmaceuticas;
       public         heap    postgres    false    3            �            1259    16661    formas_farmaceuticas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.formas_farmaceuticas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.formas_farmaceuticas_id_seq;
       public          postgres    false    210    3            �           0    0    formas_farmaceuticas_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.formas_farmaceuticas_id_seq OWNED BY public.formas_farmaceuticas.id;
          public          postgres    false    209            �            1259    16736    lotes    TABLE       CREATE TABLE public.lotes (
    id integer NOT NULL,
    numero character varying(50) NOT NULL,
    datavencimento timestamp without time zone NOT NULL,
    datafabricacao timestamp without time zone NOT NULL,
    qdte integer NOT NULL,
    id_medicamento integer NOT NULL,
    id_forma_farmaceutica integer NOT NULL,
    id_tipo_medicamento integer NOT NULL,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.lotes;
       public         heap    postgres    false    3            �            1259    16735    lotes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.lotes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.lotes_id_seq;
       public          postgres    false    3    224            �           0    0    lotes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.lotes_id_seq OWNED BY public.lotes.id;
          public          postgres    false    223            �            1259    16671    medicamentos    TABLE       CREATE TABLE public.medicamentos (
    id integer NOT NULL,
    descricao character varying(300) NOT NULL,
    principioativo character varying(300) NOT NULL,
    created timestamp without time zone NOT NULL,
    modified timestamp without time zone NOT NULL
);
     DROP TABLE public.medicamentos;
       public         heap    postgres    false    3            �            1259    16670    medicamentos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.medicamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.medicamentos_id_seq;
       public          postgres    false    3    212            �           0    0    medicamentos_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.medicamentos_id_seq OWNED BY public.medicamentos.id;
          public          postgres    false    211            �            1259    16680 	   pacientes    TABLE     �  CREATE TABLE public.pacientes (
    id integer NOT NULL,
    nome character varying(200) NOT NULL,
    cpf character varying(14) NOT NULL,
    datanascimento timestamp without time zone NOT NULL,
    telefone character varying(20) NOT NULL,
    cartaosus integer NOT NULL,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.pacientes;
       public         heap    postgres    false    3            �            1259    16679    pacientes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pacientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.pacientes_id_seq;
       public          postgres    false    214    3            �           0    0    pacientes_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.pacientes_id_seq OWNED BY public.pacientes.id;
          public          postgres    false    213            �            1259    16760 	   retiradas    TABLE     
  CREATE TABLE public.retiradas (
    id integer NOT NULL,
    qtde integer NOT NULL,
    id_users integer NOT NULL,
    id_lotes integer NOT NULL,
    id_pacientes integer NOT NULL,
    created timestamp without time zone,
    modified timestamp without time zone
);
    DROP TABLE public.retiradas;
       public         heap    postgres    false    3            �            1259    16759    retiradas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.retiradas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.retiradas_id_seq;
       public          postgres    false    226    3            �           0    0    retiradas_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.retiradas_id_seq OWNED BY public.retiradas.id;
          public          postgres    false    225            �            1259    16689    tipos_medicamentos    TABLE       CREATE TABLE public.tipos_medicamentos (
    id integer NOT NULL,
    descricao character varying(200) NOT NULL,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 &   DROP TABLE public.tipos_medicamentos;
       public         heap    postgres    false    3            �            1259    16688    tipos_medicamentos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tipos_medicamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.tipos_medicamentos_id_seq;
       public          postgres    false    216    3            �           0    0    tipos_medicamentos_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.tipos_medicamentos_id_seq OWNED BY public.tipos_medicamentos.id;
          public          postgres    false    215            �            1259    16698    turnos    TABLE     �   CREATE TABLE public.turnos (
    id integer NOT NULL,
    descricao character varying(50) NOT NULL,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.turnos;
       public         heap    postgres    false    3            �            1259    16697    turnos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.turnos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.turnos_id_seq;
       public          postgres    false    218    3            �           0    0    turnos_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.turnos_id_seq OWNED BY public.turnos.id;
          public          postgres    false    217            �            1259    16707    users    TABLE     d  CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(100) NOT NULL,
    role character varying(100) DEFAULT NULL::character varying,
    created timestamp without time zone NOT NULL,
    modified timestamp without time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    3            �            1259    16706    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    3    220            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    219            �           2604    16720    agendamentos id    DEFAULT     r   ALTER TABLE ONLY public.agendamentos ALTER COLUMN id SET DEFAULT nextval('public.agendamentos_id_seq'::regclass);
 >   ALTER TABLE public.agendamentos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    16665    formas_farmaceuticas id    DEFAULT     �   ALTER TABLE ONLY public.formas_farmaceuticas ALTER COLUMN id SET DEFAULT nextval('public.formas_farmaceuticas_id_seq'::regclass);
 F   ALTER TABLE public.formas_farmaceuticas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            �           2604    16739    lotes id    DEFAULT     d   ALTER TABLE ONLY public.lotes ALTER COLUMN id SET DEFAULT nextval('public.lotes_id_seq'::regclass);
 7   ALTER TABLE public.lotes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    16674    medicamentos id    DEFAULT     r   ALTER TABLE ONLY public.medicamentos ALTER COLUMN id SET DEFAULT nextval('public.medicamentos_id_seq'::regclass);
 >   ALTER TABLE public.medicamentos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            �           2604    16683    pacientes id    DEFAULT     l   ALTER TABLE ONLY public.pacientes ALTER COLUMN id SET DEFAULT nextval('public.pacientes_id_seq'::regclass);
 ;   ALTER TABLE public.pacientes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            �           2604    16763    retiradas id    DEFAULT     l   ALTER TABLE ONLY public.retiradas ALTER COLUMN id SET DEFAULT nextval('public.retiradas_id_seq'::regclass);
 ;   ALTER TABLE public.retiradas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    16692    tipos_medicamentos id    DEFAULT     ~   ALTER TABLE ONLY public.tipos_medicamentos ALTER COLUMN id SET DEFAULT nextval('public.tipos_medicamentos_id_seq'::regclass);
 D   ALTER TABLE public.tipos_medicamentos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    16701 	   turnos id    DEFAULT     f   ALTER TABLE ONLY public.turnos ALTER COLUMN id SET DEFAULT nextval('public.turnos_id_seq'::regclass);
 8   ALTER TABLE public.turnos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    16710    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �          0    16717    agendamentos 
   TABLE DATA                 public          postgres    false    222   %u       �          0    16662    formas_farmaceuticas 
   TABLE DATA                 public          postgres    false    210   w       �          0    16736    lotes 
   TABLE DATA                 public          postgres    false    224   ax       �          0    16671    medicamentos 
   TABLE DATA                 public          postgres    false    212   4y       �          0    16680 	   pacientes 
   TABLE DATA                 public          postgres    false    214   z       �          0    16760 	   retiradas 
   TABLE DATA                 public          postgres    false    226   �z       �          0    16689    tipos_medicamentos 
   TABLE DATA                 public          postgres    false    216   R{       �          0    16698    turnos 
   TABLE DATA                 public          postgres    false    218   |       �          0    16707    users 
   TABLE DATA                 public          postgres    false    220   �|       �           0    0    agendamentos_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.agendamentos_id_seq', 1, false);
          public          postgres    false    221            �           0    0    formas_farmaceuticas_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.formas_farmaceuticas_id_seq', 1, false);
          public          postgres    false    209            �           0    0    lotes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.lotes_id_seq', 1, false);
          public          postgres    false    223            �           0    0    medicamentos_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.medicamentos_id_seq', 1, false);
          public          postgres    false    211            �           0    0    pacientes_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.pacientes_id_seq', 1, false);
          public          postgres    false    213            �           0    0    retiradas_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.retiradas_id_seq', 1, false);
          public          postgres    false    225            �           0    0    tipos_medicamentos_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.tipos_medicamentos_id_seq', 1, false);
          public          postgres    false    215            �           0    0    turnos_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.turnos_id_seq', 1, false);
          public          postgres    false    217            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    219            �           2606    16724    agendamentos agendamentos_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.agendamentos
    ADD CONSTRAINT agendamentos_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.agendamentos DROP CONSTRAINT agendamentos_pkey;
       public            postgres    false    222            �           2606    16669 .   formas_farmaceuticas formas_farmaceuticas_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.formas_farmaceuticas
    ADD CONSTRAINT formas_farmaceuticas_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.formas_farmaceuticas DROP CONSTRAINT formas_farmaceuticas_pkey;
       public            postgres    false    210            �           2606    16743    lotes lotes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT lotes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.lotes DROP CONSTRAINT lotes_pkey;
       public            postgres    false    224            �           2606    16678    medicamentos medicamentos_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.medicamentos
    ADD CONSTRAINT medicamentos_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.medicamentos DROP CONSTRAINT medicamentos_pkey;
       public            postgres    false    212            �           2606    16687    pacientes pacientes_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.pacientes DROP CONSTRAINT pacientes_pkey;
       public            postgres    false    214            �           2606    16765    retiradas retiradas_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.retiradas
    ADD CONSTRAINT retiradas_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.retiradas DROP CONSTRAINT retiradas_pkey;
       public            postgres    false    226            �           2606    16696 *   tipos_medicamentos tipos_medicamentos_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.tipos_medicamentos
    ADD CONSTRAINT tipos_medicamentos_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.tipos_medicamentos DROP CONSTRAINT tipos_medicamentos_pkey;
       public            postgres    false    216            �           2606    16705    turnos turnos_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.turnos
    ADD CONSTRAINT turnos_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.turnos DROP CONSTRAINT turnos_pkey;
       public            postgres    false    218            �           2606    16715    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    220            �           1259    16796    idx_formas_farmaceuticas_id    INDEX     Z   CREATE INDEX idx_formas_farmaceuticas_id ON public.formas_farmaceuticas USING btree (id);
 /   DROP INDEX public.idx_formas_farmaceuticas_id;
       public            postgres    false    210            �           1259    16799    idx_lotes_forma_farmaceutica_id    INDEX     b   CREATE INDEX idx_lotes_forma_farmaceutica_id ON public.lotes USING btree (id_forma_farmaceutica);
 3   DROP INDEX public.idx_lotes_forma_farmaceutica_id;
       public            postgres    false    224            �           1259    16797    idx_lotes_medicamento_id    INDEX     T   CREATE INDEX idx_lotes_medicamento_id ON public.lotes USING btree (id_medicamento);
 ,   DROP INDEX public.idx_lotes_medicamento_id;
       public            postgres    false    224            �           1259    16798    idx_lotes_tipo_medicamento_id    INDEX     ^   CREATE INDEX idx_lotes_tipo_medicamento_id ON public.lotes USING btree (id_tipo_medicamento);
 1   DROP INDEX public.idx_lotes_tipo_medicamento_id;
       public            postgres    false    224            �           1259    16800    idx_medicamentos_id    INDEX     J   CREATE INDEX idx_medicamentos_id ON public.medicamentos USING btree (id);
 '   DROP INDEX public.idx_medicamentos_id;
       public            postgres    false    212            �           1259    16801    idx_pacientes_id    INDEX     D   CREATE INDEX idx_pacientes_id ON public.pacientes USING btree (id);
 $   DROP INDEX public.idx_pacientes_id;
       public            postgres    false    214            �           1259    16803    idx_retiradas_lotes_id    INDEX     P   CREATE INDEX idx_retiradas_lotes_id ON public.retiradas USING btree (id_lotes);
 *   DROP INDEX public.idx_retiradas_lotes_id;
       public            postgres    false    226            �           1259    16804    idx_retiradas_pacientes_id    INDEX     X   CREATE INDEX idx_retiradas_pacientes_id ON public.retiradas USING btree (id_pacientes);
 .   DROP INDEX public.idx_retiradas_pacientes_id;
       public            postgres    false    226            �           1259    16802    idx_retiradas_users_id    INDEX     P   CREATE INDEX idx_retiradas_users_id ON public.retiradas USING btree (id_users);
 *   DROP INDEX public.idx_retiradas_users_id;
       public            postgres    false    226            �           1259    16805    idx_tipos_medicamentos_id    INDEX     V   CREATE INDEX idx_tipos_medicamentos_id ON public.tipos_medicamentos USING btree (id);
 -   DROP INDEX public.idx_tipos_medicamentos_id;
       public            postgres    false    216            �           1259    16794    idx_turno_id    INDEX     I   CREATE INDEX idx_turno_id ON public.agendamentos USING btree (id_turno);
     DROP INDEX public.idx_turno_id;
       public            postgres    false    222            �           1259    16806    idx_turnos_id    INDEX     >   CREATE INDEX idx_turnos_id ON public.turnos USING btree (id);
 !   DROP INDEX public.idx_turnos_id;
       public            postgres    false    218            �           1259    16795    idx_users_id    INDEX     H   CREATE INDEX idx_users_id ON public.agendamentos USING btree (id_user);
     DROP INDEX public.idx_users_id;
       public            postgres    false    222            �           2606    16730 '   agendamentos agendamentos_id_turno_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.agendamentos
    ADD CONSTRAINT agendamentos_id_turno_fkey FOREIGN KEY (id_turno) REFERENCES public.turnos(id);
 Q   ALTER TABLE ONLY public.agendamentos DROP CONSTRAINT agendamentos_id_turno_fkey;
       public          postgres    false    3283    218    222            �           2606    16725 &   agendamentos agendamentos_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.agendamentos
    ADD CONSTRAINT agendamentos_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.agendamentos DROP CONSTRAINT agendamentos_id_user_fkey;
       public          postgres    false    222    220    3285            �           2606    16812 #   agendamentos fk_agendamentos_turnos    FK CONSTRAINT     �   ALTER TABLE ONLY public.agendamentos
    ADD CONSTRAINT fk_agendamentos_turnos FOREIGN KEY (id_turno) REFERENCES public.turnos(id);
 M   ALTER TABLE ONLY public.agendamentos DROP CONSTRAINT fk_agendamentos_turnos;
       public          postgres    false    3283    218    222            �           2606    16807 "   agendamentos fk_agendamentos_users    FK CONSTRAINT     �   ALTER TABLE ONLY public.agendamentos
    ADD CONSTRAINT fk_agendamentos_users FOREIGN KEY (id_user) REFERENCES public.users(id);
 L   ALTER TABLE ONLY public.agendamentos DROP CONSTRAINT fk_agendamentos_users;
       public          postgres    false    3285    222    220            �           2606    16822 !   lotes fk_lotes_forma_farmaceutica    FK CONSTRAINT     �   ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT fk_lotes_forma_farmaceutica FOREIGN KEY (id_forma_farmaceutica) REFERENCES public.formas_farmaceuticas(id);
 K   ALTER TABLE ONLY public.lotes DROP CONSTRAINT fk_lotes_forma_farmaceutica;
       public          postgres    false    210    3270    224            �           2606    16827    lotes fk_lotes_medicamento    FK CONSTRAINT     �   ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT fk_lotes_medicamento FOREIGN KEY (id_medicamento) REFERENCES public.medicamentos(id);
 D   ALTER TABLE ONLY public.lotes DROP CONSTRAINT fk_lotes_medicamento;
       public          postgres    false    3274    212    224            �           2606    16817    lotes fk_lotes_tipo_medicamento    FK CONSTRAINT     �   ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT fk_lotes_tipo_medicamento FOREIGN KEY (id_tipo_medicamento) REFERENCES public.tipos_medicamentos(id);
 I   ALTER TABLE ONLY public.lotes DROP CONSTRAINT fk_lotes_tipo_medicamento;
       public          postgres    false    3280    216    224            �           2606    16837    retiradas fk_retiradas_lotes    FK CONSTRAINT     |   ALTER TABLE ONLY public.retiradas
    ADD CONSTRAINT fk_retiradas_lotes FOREIGN KEY (id_lotes) REFERENCES public.lotes(id);
 F   ALTER TABLE ONLY public.retiradas DROP CONSTRAINT fk_retiradas_lotes;
       public          postgres    false    226    3294    224            �           2606    16842     retiradas fk_retiradas_pacientes    FK CONSTRAINT     �   ALTER TABLE ONLY public.retiradas
    ADD CONSTRAINT fk_retiradas_pacientes FOREIGN KEY (id_pacientes) REFERENCES public.pacientes(id);
 J   ALTER TABLE ONLY public.retiradas DROP CONSTRAINT fk_retiradas_pacientes;
       public          postgres    false    214    226    3277            �           2606    16832    retiradas fk_retiradas_users    FK CONSTRAINT     |   ALTER TABLE ONLY public.retiradas
    ADD CONSTRAINT fk_retiradas_users FOREIGN KEY (id_users) REFERENCES public.users(id);
 F   ALTER TABLE ONLY public.retiradas DROP CONSTRAINT fk_retiradas_users;
       public          postgres    false    220    3285    226            �           2606    16749 &   lotes lotes_id_forma_farmaceutica_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT lotes_id_forma_farmaceutica_fkey FOREIGN KEY (id_forma_farmaceutica) REFERENCES public.formas_farmaceuticas(id);
 P   ALTER TABLE ONLY public.lotes DROP CONSTRAINT lotes_id_forma_farmaceutica_fkey;
       public          postgres    false    210    224    3270            �           2606    16744    lotes lotes_id_medicamento_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT lotes_id_medicamento_fkey FOREIGN KEY (id_medicamento) REFERENCES public.medicamentos(id);
 I   ALTER TABLE ONLY public.lotes DROP CONSTRAINT lotes_id_medicamento_fkey;
       public          postgres    false    3274    212    224            �           2606    16754 $   lotes lotes_id_tipo_medicamento_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT lotes_id_tipo_medicamento_fkey FOREIGN KEY (id_tipo_medicamento) REFERENCES public.tipos_medicamentos(id);
 N   ALTER TABLE ONLY public.lotes DROP CONSTRAINT lotes_id_tipo_medicamento_fkey;
       public          postgres    false    216    224    3280            �           2606    16771 !   retiradas retiradas_id_lotes_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.retiradas
    ADD CONSTRAINT retiradas_id_lotes_fkey FOREIGN KEY (id_lotes) REFERENCES public.lotes(id);
 K   ALTER TABLE ONLY public.retiradas DROP CONSTRAINT retiradas_id_lotes_fkey;
       public          postgres    false    226    3294    224            �           2606    16776 %   retiradas retiradas_id_pacientes_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.retiradas
    ADD CONSTRAINT retiradas_id_pacientes_fkey FOREIGN KEY (id_pacientes) REFERENCES public.pacientes(id);
 O   ALTER TABLE ONLY public.retiradas DROP CONSTRAINT retiradas_id_pacientes_fkey;
       public          postgres    false    3277    226    214            �           2606    16766 !   retiradas retiradas_id_users_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.retiradas
    ADD CONSTRAINT retiradas_id_users_fkey FOREIGN KEY (id_users) REFERENCES public.users(id);
 K   ALTER TABLE ONLY public.retiradas DROP CONSTRAINT retiradas_id_users_fkey;
       public          postgres    false    226    220    3285            �   J  x����n�0��}��m+5ȟ�mN-�UX���m�*�6A����q�S�1��#[Z�JVbO{~󟙋Yq>�����g�6,���{���>��o:�:�o�8f�&\[ۺl�tP4���ֽ�&�q>X(mWCU����3 �H�7����a�Z?�2ńb��SZ3F��kHo��s�{�����&��#�'�� ������̃Yj��������r<���o8����@}l��/�|t�f)R�*V?�l�y�$�������x�*+T�#J��y���sab��x����0�(Ȗg��k�f��um𖆠Ϛ�q]���*�H�,t�����4�0b�ڡP@�!��� �g|�-�kח�sLC~Y�'��Iy?����rM�}$�_����Y�j�FD�����,õ���	K���0��1�0Ǌj���pU��V(��
����lP�Q!U+Ƕ�r�u�g�Ğ<c�!Pz��*��U�k�>d�쥲Q�b�G �ٖ(��~/x�h����L�| 'ۄۓ��F�Dhd�Ok7�0�h�G�H�)B����s��:5"��+f����XZw�      �   �   x����
�0��>�m*X�i#U'��T�U��L*ZS����A}���)>����8���8YlR��te}���*PNh��J0԰�-����>t�(�(��c[��z�%��$'t4�B��˴7u����k��[��6q�J�Y���&��3o��Z˼6ws���AǶ�h�;g*���C���#��|��2R����qޓ�ڃ      �   �   x�ő�
�@��>E�*ܕ$��m�:��U@q

��{Wj�-袘d�G��(�|���ܬ�r�קCT�o�+��m^�����]��F� 1k��Yc��'3*�PS��h��f"%����4|�:��'R����M�C�x,�C��-�_`�3T���!9SQƦi���T�G�A���4� �R}2=K�[�A� yO�      �   �   x�����@@w������9��@b����p	p�� ���cA��.M����a��(9B}�2]�y&SQ�U�Z��� ���s/k٨J�o9��R2kD'��A��A�x���g���f7�rk�?��T�,�����L�H�N�������ћ0���1���lXq�6�R�G��O�3|N&L,t�x��ܡ�k/�g�      �   �   x����
�@E�|�t�����w�,�W�������U���νw���r�XAݬ�p�lw�-���ݾ�ΰ�֓%4�|�1�����`|
���$,%��*�&��,P��X=.���x�L�yN�IY�Q���i��W�+��S���t0��o,8Yt}l�@�F���NH���e7=�\�      �   s   x���v
Q���W((M��L�+J-�,JLI,Vs�	uVа�Q0�Q04�P:
�FFƺ���F
��V&�V���8�5��<���RG�b�	��aF`�����q��� �(.�      �   �   x���v
Q���W((M��L�+�,�/��MM�LN�M�+�/Vs�	uV�0�QPw�K�I?��839�X�7202�50�52U0��25�20�36�45�  �i��I��F`�K2�2o.����P��2�3�l�	�n�̼����ĒÛ�2� �PG�ޕ�N��7�Z_�X�X�Yrx!5B�� �I��      �   i   x���v
Q���W((M��L�+)-��/Vs�	uV�0�QP�M,)-���W���LuLu�L,�L��LM�,�,	�jZsy��hFXjqAj5��� �`6�      �   6  x����n�@��>�LԤ ����R��b�M{[`ii�ՕU����b��i��6�������"��h-�<�U�eb��;�	�5FL��*�(a(��H�-�`��9L�C�^�]�\e�T#Q�u\�A��a��l�ݑ�(�w�Co�O�˜]�8s��jSm���5ޖO�i�ꏨX���!�,�Mڪ��T +`!0��%��c��Nt�`�Ѻ�9�Jv�e�GL��#��&FqLSk��;3Xć�hh����y6p�^{G�7�|�����|o����ty"=}&���@L��v�XW �C���+�Z�%+~     