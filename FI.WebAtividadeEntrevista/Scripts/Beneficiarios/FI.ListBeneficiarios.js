$(document).ready(function () {
    var urlBeneficiarioList = '@Url.Action("BeneficiarioList", "Beneficiario", new { area = "" })';
    var urlIncluirBeneficiario = '@Url.Action("Incluir", "Beneficiario", new { area = "" })';

    // Inicializa o modal e carrega a lista de beneficiários
    $('#beneficiarioModal').on('show.bs.modal', function () {
        loadBeneficiarios(); // Carrega a lista ao abrir o modal
    });

    // Função para incluir novo beneficiário
    $('#incluirBeneficiario').click(function () {
        var cpf = $('#cpfBeneficiario').val();
        var nome = $('#nomeBeneficiario').val();
        var clienteId = $('#clienteId').val();

        if (cpf && nome) { // Verifica se os campos estão preenchidos
            $.ajax({
                url: urlIncluirBeneficiario,
                type: 'POST',
                data: {
                    CPF: cpf,
                    Nome: nome,
                    IdCliente: clienteId
                },
                success: function (data) {
                    if (data.success) {
                        $('#cpfBeneficiario').val(''); // Limpa o campo CPF
                        $('#nomeBeneficiario').val(''); // Limpa o campo Nome
                        loadBeneficiarios(); // Recarrega a lista após incluir
                    } else {
                        alert(data.message);
                    }
                },
                error: function () {
                    alert('Erro ao incluir o beneficiário.');
                }
            });
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Função para carregar a lista de beneficiários no modal
    function loadBeneficiarios() {
        var clienteId = $('#clienteId').val();

        $.get(urlBeneficiarioList, { clienteId: clienteId }, function (beneficiarios) {
            var grid = $('#gridBeneficiarios');
            grid.empty(); // Limpa a tabela antes de recarregar

            beneficiarios.forEach(function (beneficiario) {
                grid.append(
                    '<tr>' +
                    '<td>' + beneficiario.CPF + '</td>' +
                    '<td>' + beneficiario.Nome + '</td>' +
                    '<td>' +
                    '<button class="btn btn-primary btn-sm" onclick="alterarBeneficiario(' + beneficiario.Id + ')">Alterar</button> ' +
                    '<button class="btn btn-danger btn-sm" onclick="excluirBeneficiario(' + beneficiario.Id + ')">Excluir</button>' +
                    '</td>' +
                    '</tr>'
                );
            });
        });
    }

    // Função para alterar beneficiário (a ser implementada)
    window.alterarBeneficiario = function(id) {
        // Lógica para alterar beneficiário
        alert("Função para alterar beneficiário com ID: " + id);
    }

    // Função para excluir beneficiário
    window.excluirBeneficiario = function(id) {
        if (confirm('Tem certeza que deseja excluir o beneficiário?')) {
            $.ajax({
                url: '@Url.Action("Excluir", "Beneficiario", new { area = "" })',
                type: 'POST',
                data: { id: id },
                success: function (data) {
                    if (data.success) {
                        loadBeneficiarios(); // Recarrega a lista após excluir
                    } else {
                        alert('Erro ao excluir o beneficiário.');
                    }
                },
                error: function () {
                    alert('Erro ao excluir o beneficiário.');
                }
            });
        }
    }
});
