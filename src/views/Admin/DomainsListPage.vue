<template>
    <a-row :gutter="20">
        <a-col :span="24">
            <DefaultBlock borderedTitle class="domains-list">
                <div slot="title" class="title-block">
                    <div class="title">Список доменов</div>
                    <div class="space"></div>
                    <a-button icon="menu-unfold" class="test-all-urls-btn" @click="domainsQueueModalVisible = true">
                        Изменить очередность доменов
                    </a-button>
                    <a-button icon="sync" class="test-all-urls-btn" @click="showUrlsTreeToTestModal">
                        Запустить тестирование
                    </a-button>
                    <a-button type="primary" icon="plus" @click="showDomainModalWindow">Добавить домен</a-button>
                </div>
                <div slot="content">
                    <a-table :columns="columns" :dataSource="data" class="components-table-demo-nested" rowKey="domain"
                             :pagination="false">
                        <div slot="favourite" slot-scope="isFavourite, record">
                            <a-checkbox @change="onDomainFavouriteChange($event, record.domain)"
                                        :default-checked="isFavourite">
                            </a-checkbox>
                        </div>
                        <div slot="addNew" slot-scope="record">
                            <a-button type="link" icon="plus" @click="showNewUrlModalWindow(record.domain)"
                                      size="small">
                                Добавить страницу
                            </a-button>
                        </div>
                        <div slot="deleteDomain" slot-scope="record">
                            <a-button type="link" shape="circle" icon="delete"
                                      @click="showDeleteDomainConfirm(record.domain)"/>
                        </div>
                        <a-table slot="expandedRowRender"
                                 slot-scope="record"
                                 :columns="innerColumns"
                                 :dataSource="record.urlsList"
                                 :pagination="false"
                                 rowKey="url">
                            <div slot="favourite" slot-scope="isFavourite, record">
                                <a-checkbox :default-checked="isFavourite"
                                            @change="onUrlFavouriteChange($event, record.url)">
                                </a-checkbox>
                            </div>
                            <div slot="deleteUrl" slot-scope="record">
                                <a-button type="link" shape="circle" icon="delete"
                                          @click="showDeleteUrlConfirm(record.url)"/>
                            </div>
                        </a-table>
                    </a-table>
                    <a-modal
                            title="Добавить домен"
                            :visible="addNewDomainModalVisible"
                            @ok="addNewDomain"
                            :confirmLoading="addNewDomainConfirmLoading"
                            @cancel="hideDomainModalWindow"
                            class="modal-window"
                            okText="Добавить"
                            cancelText="Отмена"
                            width="720px">
                        <a-form :form="domainForm">
                            <a-form-item
                                    :label-col="DomainFormItemLayout.labelCol"
                                    :wrapper-col="DomainFormItemLayout.wrapperCol"
                                    label="Домен (без www и http)">
                                <a-input
                                        v-decorator="['domain',{rules: [{ required: true, message: 'Введите доменное имя'}, {pattern: /^([a-z0-9]{2,}\.)+[a-z0-9]{2,}$/gi, message: 'Неверный домен'}]}]"
                                        placeholder="Введите домен"/>
                            </a-form-item>
                            <a-form-item
                                    :label-col="DomainFormTailLayout.labelCol"
                                    :wrapper-col="DomainFormTailLayout.wrapperCol">
                                <a-checkbox
                                        v-decorator="['isFavourite', {valuePropName: 'checked', initialValue: false}]">
                                    Отображать на главной
                                </a-checkbox>
                            </a-form-item>
                        </a-form>
                    </a-modal>

                    <a-modal
                            :title="'Добавить страницу для:  ' + urlFormDomainName"
                            :visible="addNewUrlModalVisible"
                            @ok="addNewUrl"
                            :confirmLoading="addNewUrlConfirmLoading"
                            @cancel="hideUrlModalWindow"
                            class="modal-window"
                            okText="Добавить"
                            cancelText="Отмена"
                            width="1000px">
                        <a-form :form="urlForm">
                            <a-form-item
                                    :label-col="UrlFormItemLayout.labelCol"
                                    :wrapper-col="UrlFormItemLayout.wrapperCol"
                                    label="Url">
                                <a-input
                                        v-decorator="['url',{
                                        rules: [{ required: true, message: 'Введите url'}, {pattern: /^([a-z0-9]{2,}\.)+[a-z0-9]{2,}(\/.*)*$/gi, message: 'Неверный url'}],
                                        initialValue: urlFormDomainName + '/'}]"
                                        placeholder="Введите url"/>
                            </a-form-item>
                            <a-form-item
                                    :label-col="UrlFormTailLayout.labelCol"
                                    :wrapper-col="UrlFormTailLayout.wrapperCol">
                                <a-checkbox
                                        v-decorator="['isFavourite', {valuePropName: 'checked', initialValue: false}]">
                                    Отображать на главной
                                </a-checkbox>
                            </a-form-item>
                        </a-form>
                    </a-modal>
                    <a-modal
                            title="Протестировать страницы"
                            :visible="testUrlsListModalVisible"
                            @ok="testUrlsList"
                            @cancel="hideUrlsTreeToTestModal"
                            okText="Протестировать"
                            cancelText="Отмена"
                            width="1200px">
                        <a-tree
                                checkable
                                v-model="selectedUrlsToTest"
                                :treeData="urlsTreeData"
                                :autoExpandParent="true"
                        />
                    </a-modal>
                    <a-modal
                            title="Изменение очередности отображения"
                            :visible="domainsQueueModalVisible"
                            @ok="changeDomainsQueue"
                            @cancel="hideDomainsQueueModal"
                            okText="Изменить"
                            cancelText="Отмена"
                            width="720px">
                        <draggable v-model="allDomainsList">
                            <transition-group>
                                <div v-for="element in allDomainsList" :key="element" class="drag-and-drop-list-item">
                                    {{element}}
                                </div>
                            </transition-group>
                        </draggable>
                    </a-modal>
                </div>
            </DefaultBlock>
        </a-col>
    </a-row>
</template>

<script>
    import DefaultBlock from '@/components/User/Block';
    import errorHandler from "../../methods/errorHandler";
    import draggable from 'vuedraggable'

    const DomainFormItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    const DomainFormTailLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16, offset: 8},
    };
    const UrlFormItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 20},
    };
    const UrlFormTailLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 20, offset: 4},
    };

    const columns = [
        {title: 'Домен', dataIndex: 'domain', key: 'domain', width: '35%'},
        {title: 'Добавлен', dataIndex: 'added_by', key: 'added_by', width: '15%'},
        {
            title: 'Показать на главной',
            key: 'favourite',
            dataIndex: 'favourite',
            scopedSlots: {customRender: 'favourite'},
            width: '15%',
            align: 'center'
        },
        {title: 'Добавить страницу', scopedSlots: {customRender: 'addNew'}, width: '20%', align: 'center'},
        {title: 'Удалить домен', scopedSlots: {customRender: 'deleteDomain'}, width: '20%', align: 'center'}
    ];

    const innerColumns = [
        {title: 'Url', dataIndex: 'url', key: 'url', width: '54%'},
        {title: 'Добавлен', dataIndex: 'added_by', key: 'added_by', width: '11%'},
        {
            title: 'Показать на главной',
            key: 'favourite',
            dataIndex: 'favourite',
            scopedSlots: {customRender: 'favourite'},
            width: '20%',
            align: 'center'
        },
        {title: 'Удалить страницу', scopedSlots: {customRender: 'deleteUrl'}, width: '20%', align: 'center'}
    ];

    export default {
        name: "DomainsListPage",
        data() {
            return {
                columns,
                innerColumns,
                data: [],
                addNewDomainModalVisible: false,
                addNewUrlModalVisible: false,
                addNewDomainConfirmLoading: false,
                addNewUrlConfirmLoading: false,
                DomainFormItemLayout,
                DomainFormTailLayout,
                UrlFormItemLayout,
                UrlFormTailLayout,
                domainForm: this.$form.createForm(this),
                urlForm: this.$form.createForm(this),
                urlFormDomainName: '',
                testUrlsListModalVisible: false,
                urlsTreeData: [],
                selectedUrlsToTest: [],
                allUrlsList: [],
                allDomainsList: [],
                domainsQueueModalVisible: false
            }
        },
        components: {
            DefaultBlock,
            draggable
        },
        methods: {
            showDeleteDomainConfirm(domain) {
                this.$confirm({
                    title: `Вы уверенеы, что хотите удалить домен ${domain}?`,
                    okText: 'Да',
                    okType: 'danger',
                    cancelText: 'Нет',
                    onOk: () => {
                        this.deleteDomain(domain);
                    }
                });
            },
            deleteDomain(domain) {
                this.$http.post('/domain/remove', null, {
                    params: {
                        token: this.$store.getters.userData.token, domain
                    }
                })
                    .then(() => {
                        this.getDomainsList();
                        this.$message.success('Изменения успешно сохранены', 5);
                    })
                    .catch((error) => {
                        this.$message.error('Изменения не сохранены', 5);
                        if (error.response) {
                            this.$message.error(error.response.data, 5);
                        } else {
                            // console.log(error);
                        }
                    })
            },
            showDeleteUrlConfirm(url) {
                this.$confirm({
                    title: `Вы уверенеы, что хотите удалить страницу ${url}?`,
                    okText: 'Да',
                    okType: 'danger',
                    cancelText: 'Нет',
                    onOk: () => {
                        this.deleteUrl(url);
                    }
                });
            },
            deleteUrl(url) {
                this.$http.post('/url/remove', null, {
                    params: {
                        token: this.$store.getters.userData.token, url
                    }
                })
                    .then(() => {
                        this.getDomainsList();
                        this.$message.success('Изменения успешно сохранены', 5);
                    })
                    .catch((error) => {
                        this.$message.error('Изменения не сохранены', 5);
                        if (error.response) {
                            this.$message.error(error.response.data, 5);
                        } else {
                            // console.log(error);
                        }
                    })
            },
            onDomainFavouriteChange(checked, domain) {
                this.$http.post('/domain/change_is_favourite_field', null, {
                    params: {
                        token: this.$store.getters.userData.token,
                        domain, isFavourite: checked.target.checked
                    }
                })
                    .then(() => {
                        this.$message.success('Изменения успешно сохранены', 5);
                    })
                    .catch((error) => {
                        this.$message.error('Изменения не сохранены', 5);
                        if (error.response) {
                            this.$message.error(error.response.data, 5);
                        } else {
                            // console.log(error);
                        }
                    })
            },
            onUrlFavouriteChange(checked, url) {
                this.$http.post('/url/change_is_favourite_field', null, {
                    params: {
                        token: this.$store.getters.userData.token,
                        url, isFavourite: checked.target.checked
                    }
                })
                    .then(() => {
                        this.$message.success('Изменения успешно сохранены', 5);
                    })
                    .catch((error) => {
                        this.$message.error('Изменения не сохранены', 5);
                        if (error.response) {
                            this.$message.error(error.response.data, 5);
                        } else {
                            // console.log(error);
                        }
                    })
            },
            showNewUrlModalWindow(domain) {
                this.urlFormDomainName = domain;
                this.addNewUrlModalVisible = true
            },
            showDomainModalWindow() {
                this.addNewDomainModalVisible = true
            },
            addNewUrl(e) {
                e.preventDefault();
                this.addNewUrlConfirmLoading = true;
                this.urlForm.validateFields((err, values) => {
                    if (!err) {
                        this.addNewUrlPostRequest(values.url, values.isFavourite, this.urlFormDomainName, () => {
                            this.addNewUrlModalVisible = false;
                            this.addNewUrlConfirmLoading = false;
                            this.urlForm.resetFields();
                            this.getDomainsList();
                            this.$message.success('Url успешно сохранен', 5);
                        })
                    }
                });
            },
            addNewUrlPostRequest(urlName, isFavourite, domainName, onSuccess) {
                this.$http.post('/url/create', null, {
                    params: {
                        token: this.$store.getters.userData.token,
                        domainName, isFavourite, urlName
                    }
                })
                    .then(() => {
                        this.getDomainsList();
                        onSuccess();
                    })
                    .catch((error) => {
                        this.addNewUrlConfirmLoading = false;
                        errorHandler(this, error)
                    })
            },
            addNewDomain(e) {
                e.preventDefault();
                this.addNewDomainConfirmLoading = true;
                this.domainForm.validateFields((err, values) => {
                    if (!err) {
                        this.addNewDomainPostRequest(values.domain, values.isFavourite, () => {
                            this.$message.success('Домен успешно сохранен', 5);
                            this.addNewDomainModalVisible = false;
                            this.addNewDomainConfirmLoading = false;
                            this.getDomainsList();
                            this.domainForm.resetFields();
                        })
                    }
                });
            },
            addNewDomainPostRequest(domain, isFavourite, onSuccess) {
                this.$http.post('/domain/create', null, {
                    params: {
                        token: this.$store.getters.userData.token,
                        domain, isFavourite
                    }
                }).then(() => {
                    onSuccess();
                }).catch((error) => {
                    this.addNewDomainConfirmLoading = false;
                    errorHandler(this, error)
                })
            },
            hideDomainModalWindow() {
                this.addNewDomainModalVisible = false
            },
            hideUrlModalWindow() {
                this.addNewUrlModalVisible = false
            },
            getDomainsList() {
                this.$http.get('/pages/get_info_about_urls_and_domain_for_admin_panel', {
                    params: {
                        token: this.$store.getters.userData.token
                    }
                })
                    .then((res) => {
                        this.data = res.data;
                        this.updateUrlsToTestTree(res.data);
                    })
                    .catch((error) => {
                        if (error.response) {
                            this.$message.error(error.response.data, 10);
                        } else {
                            console.log(error);
                        }
                    })
            },
            showUrlsTreeToTestModal() {
                this.testUrlsListModalVisible = true;
            },
            updateUrlsToTestTree(pagesData) {
                this.allUrlsList = [];
                this.allDomainsList = [];
                this.urlsTreeData = [];
                pagesData.forEach(domainData => {
                    const treeItem = {
                        title: domainData.domain,
                        key: domainData.domain,
                        children: []
                    };
                    this.allDomainsList.push(domainData.domain);
                    if (domainData.urlsList) {
                        domainData.urlsList.forEach(urlItem => {
                            this.allUrlsList.push(urlItem.url);
                            treeItem.children.push({
                                title: urlItem.url,
                                key: urlItem.url
                            })
                        });
                        this.urlsTreeData.push(treeItem);
                    }
                });
            },
            hideUrlsTreeToTestModal() {
                this.testUrlsListModalVisible = false;
            },
            testUrlsList() {
                let onlyUrlsNamesList = [];
                this.selectedUrlsToTest.forEach(url => {
                    if (this.allUrlsList.indexOf(url) !== -1) {
                        onlyUrlsNamesList.push({name: url});
                    }
                });
                this.$http.post('/testing_server/test_urls_list', null, {
                    params: {
                        token: this.$store.getters.userData.token,
                        list_of_urls: JSON.stringify(onlyUrlsNamesList)
                    }
                }).then(() => {
                    this.$message.success('Тестирование успешно запущено', 10);
                }).catch((error) => {
                    if (error.response) {
                        this.$message.error(error.response.data, 10);
                    }
                })
            },
            changeDomainsQueue() {
                this.$http.post('/domain/change_domain_priority', null, {
                    params: {
                        token: this.$store.getters.userData.token,
                        domainsList: JSON.stringify(this.allDomainsList)
                    }
                })
                    .then(() => {
                        this.domainsQueueModalVisible = false;
                        this.$message.success('Изменения успешно внесены', 10);
                        setTimeout(() => {
                            this.getDomainsList();
                        }, 1000);
                    })
                    .catch((error) => {
                        errorHandler(this, error)
                    })
            },
            hideDomainsQueueModal() {
                this.domainsQueueModalVisible = false;
            }
        },
        beforeMount() {
            this.getDomainsList();
        }
    }
</script>

<style lang="scss">
    .domains-list {
        .title-block {
            display: flex;
            width: 100%;

            .title {
                margin-top: 8px;
            }

            .space {
                flex-grow: 1;
            }
        }
    }

    .test-all-urls-btn {
        margin-right: 20px;
    }

    .modal-window .ant-modal-body {
        padding-bottom: 0;
    }

    .drag-and-drop-list-item {
        border: 1px solid #ddd;
        border-top: none;
        padding: 10px 15px;
        font-size: 14px;
        background: #ffffff;
    }

    .drag-and-drop-list-item:first-child {
        border-top: 1px solid #ddd;
        border-radius: 4px 4px 0 0;
    }

    .drag-and-drop-list-item:last-child {
        border-radius: 0 0 4px 4px;
    }
</style>