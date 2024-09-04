$(document).ready(function () {
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable({
            title: 'Beneficiários',
            paging: true,
            pageSize: 5, // Define o tamanho da página
            sorting: true, // Habilita ordenação
            defaultSorting: 'Nome ASC', // Ordenação padrão
            actions: {
                listAction: urlBeneficiarioList, // URL para carregar os beneficiários
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
                        return '<button onclick="window.location.href=\'' + urlAlterarBeneficiario + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">TESTE</button>';
                    }
                }
            }
        });

    // Carrega a lista de beneficiários ao abrir o modal
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable('load', { clienteId: $('#clienteId').val() });
});
