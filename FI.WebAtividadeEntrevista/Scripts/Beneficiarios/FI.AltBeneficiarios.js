$(document).ready(function () {
    $('#alterarBeneficiario').click(function (e) {
        e.preventDefault(); // Evitar submissão padrão do formulário

        var id = $('#beneficiarioId').val(); // ID do beneficiário a ser alterado
        var cpf = $('#cpfBeneficiario').val();
        var nome = $('#nomeBeneficiario').val();
        var clienteId = $('#clienteId').val();

        $.ajax({
            url: '/Beneficiario/Alterar',
            type: 'POST',
            data: {
                Id: id,
                CPF: cpf,
                Nome: nome,
                IdCliente: clienteId
            },
            success: function (data) {
                if (data.success) {
                    $('#gridBeneficiarios').jtable('reload'); // Recarrega a lista de beneficiários
                    $('#beneficiarioModal').modal('hide'); // Fecha o modal
                } else {
                    alert(data.message);
                }
            },
            error: function () {
                alert('Erro ao alterar o beneficiário.');
            }
        });
    });
});
