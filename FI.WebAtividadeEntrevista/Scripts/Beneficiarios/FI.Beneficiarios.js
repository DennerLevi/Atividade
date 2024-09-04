$(document).ready(function () {
    $('#incluirBeneficiario').click(function (e) {
        console.log("Botão 'Incluir' clicado");
        e.preventDefault(); // Evita a submissão padrão do formulário

        var cpf = $('#cpfBeneficiario').val();
        var nome = $('#nomeBeneficiario').val();
        var clienteId = $('#clienteId').val();
        console.log("ID do Cliente: " + clienteId);

        // Logs para verificar os valores capturados
        console.log("CPF: " + cpf);
        console.log("Nome: " + nome);
        console.log("ID do Cliente: " + clienteId);

        $.ajax({
            url: '/Beneficiario/Incluir', // URL para a action Incluir no BeneficiarioController
            type: 'POST',
            data: {
                CPF: cpf,
                Nome: nome,
                IdCliente: clienteId
            },
            success: function (data) {
                console.log("Requisição AJAX bem-sucedida, resposta do servidor:", data);
                if (data.success) {
                    $('#gridBeneficiarios').jtable('reload'); // Recarrega a lista de beneficiários
                    $('#cpfBeneficiario').val(''); // Limpa os campos do modal
                    $('#nomeBeneficiario').val('');
                } else {
                    alert(data.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Erro na requisição AJAX:", textStatus, errorThrown);
                alert('Erro ao incluir o beneficiário.');
            }
        });
    });
});
