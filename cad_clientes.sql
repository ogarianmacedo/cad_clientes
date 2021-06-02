CREATE TABLE `tb_clientes` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `nome` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
   `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
   `endereco` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
   `observacao` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
   `nascimento` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
   `cpf` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
   `celular` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
   PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci

INSERT INTO `tb_clientes` (`nome`, `email`, `endereco`, `observacao`, `nascimento`, `cpf`, `celular`) VALUES
('Maria Julina', 'maria@email.com', 'Santa Cruz do Sul', 'Olá!', '24/04/2001', '09894257976', '84986324564'),
('Gabrielly Tânia Priscila', 'gabitania@email.com', 'Rua Margarida Militão', NULL, '07/04/1993', '98630457139', '84986321234'),
('Paulo Caleb Silva', 'paulocalebsilva_@yogoothies.com.br', 'Avenida Independência', NULL, '18/04/1990', '45180264979', '84986321234'),
('Mario Bros', 'mario@email.com', 'Rua B, cs 789', 'Não tem', '13/01/1955', '35614965394', '61998877445'),
('Maria Cadu', 'maria@email.com', 'Rua 15', NULL, '25/01/1987', '23409562427', '61998877445'),
('Sandra Lorena Assis', 'sandralorenaassis@fcacomputers.com.br', 'asdfsdf', NULL, '18/19/8788', '99285263895', '00000000000'),
('Alice Vera da Mota', 'aliceveradamota@opcaoeduca.com.br', 'Rua Pedro Nava', NULL, '08/06/1948', '60271043849', '69983301412');
