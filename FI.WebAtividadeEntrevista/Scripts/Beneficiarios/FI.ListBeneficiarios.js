$(document).ready(function () {
    var urlBeneficiarioList = '@Url.Action("BeneficiarioList", "Beneficiario", new { area = "" })';
    var urlIncluirBeneficiario = '@Url.Action("Incluir", "Beneficiario", new { area = "" })';

    // Inicializa o gridBeneficiarios quando o modal é aberto
    $('#beneficiarioModal').on('show.bs.modal', function () {
        $('#gridBeneficiarios').jtable({
            title: 'Beneficiários',
            paging: true,
            pageSize: 5,
            sorting: true,
            defaultSorting: 'Nome ASC',
            actions: {
                listAction: urlBeneficiarioList,
            },
            fields: {
                CPF: {
                    title: 'CPF',
                    width: '30%'
                },
                Nome: {
                    title: 'Nome',
                    width: '50%'
                },
                Alterar: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="alterarBeneficiario(' + data.record.Id + ')" class="btn btn-primary btn-sm">Alterar</button>';
                    }
                },
                Excluir: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="excluirBeneficiario(' + data.record.Id + ')" class="btn btn-danger btn-sm">Excluir</button>';
                    }
                }
            }
        });

        // Carrega a tabela com os beneficiários do cliente atual
        $('#gridBeneficiarios').jtable('load', { clienteId: $('#clienteId').val() });
    });

    // Função para incluir novo beneficiário
    $('#incluirBeneficiario').click(function () {
        var cpf = $('#cpfBeneficiario').val();
        var nome = $('#nomeBeneficiario').val();
        var clienteId = $('#clienteId').val();

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
                    $('#gridBeneficiarios').jtable('reload');
                    $('#cpfBeneficiario').val('');
                    $('#nomeBeneficiario').val('');
                } else {
                    alert(data.message);
                }
            },
            error: function () {
                alert('Erro ao incluir o beneficiário.');
            }
        });
    });

    // Funções para alterar e excluir beneficiário
    function alterarBeneficiario(id) {
        // Lógica para alterar beneficiário
    }

    function excluirBeneficiario(id) {
        // Lógica para excluir beneficiário
    }
});
