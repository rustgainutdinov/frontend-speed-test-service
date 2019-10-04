<template>
    <div class="main-container">
        <header>
            <div class="navigation-bg">
                <div class="navigation">
                    <router-link :to="{path: '/user'}" class="logo" tag="div">
                        <img src="@/assets/ispring-logo-white245x96.jpg" alt="">
                        <p>| speed-test</p>
                    </router-link>
                    <div class="domains-list" :class="{active: isSelectActive}">
                        <a-select
                                placeholder="Выберите домен"
                                optionFilterProp="children"
                                style="width: 200px"
                                @focus="handleFocus"
                                @blur="handleBlur">
                            <a-select-option v-for="domain in domainsList" :key="domain">
                                <router-link :to="'/user/' + domain" tag="div" style="width: 100%; color: #1890ff;">
                                    {{domain}}
                                </router-link>
                            </a-select-option>
                        </a-select>
                    </div>
                    <div class="space">
                    </div>
                    <div class="menu">
                        <ul>
                            <li v-if="getPriority() >= 200">
                                <router-link :to="{path: '/user/admin-panel'}">
                                    <a-icon type="user"/>
                                </router-link>
                            </li>
                            <li @click="logout">
                                <router-link :to="{path: '/guest'}">
                                    <a-icon type="logout"/>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="subheader">
                <a-breadcrumb>
                    <a-breadcrumb-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb">
                        <router-link :to="breadcrumb.path">{{breadcrumb.name}}</router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </div>
        </header>
        <slot name="content">
        </slot>
    </div>
</template>

<script>
    import getPriority from "../middleware/getPriority";
    import clearUserData from "../methods/clearUserData";

    export default {
        name: "Base",
        data() {
            return {
                isSelectActive: false,
                breadcrumbs: [],
                domainsList: [],
            }
        },
        methods: {
            getPriority,
            clearUserData,
            logout() {
                clearUserData(this);
            },
            handleBlur() {
                this.isSelectActive = false;
            },
            handleFocus() {
                this.isSelectActive = true;
            },
            changeBreadCrumbsList() {
                this.breadcrumbs = [];
                this.$breadcrumbs.forEach(item => {
                    let breadcrumb = {
                        path: null,
                        name: null
                    };

                    if (typeof item.meta.breadcrumb === 'function') {
                        breadcrumb = item.meta.breadcrumb(this.$route, item);
                    } else {
                        breadcrumb.path = item.path;
                        breadcrumb.name = item.meta.breadcrumb;
                    }

                    this.breadcrumbs.push(breadcrumb);
                });
            },
            async getDomainsList() {
                await this.$http.get('/domain/get_full_info_about_all_domains', {
                    params: {
                        token: this.$store.getters.userData.token,
                    }
                })
                    .then((res) => {
                        this.domainsList = [];
                        res.data.forEach(item => {
                            this.domainsList.push(item.domain);
                        });
                    })
                    .catch((error) => {
                        if (error.response) {
                            this.$message.error(error.response.data, 10);
                        } else {
                            // console.log(error);
                        }
                    })
            }
        },
        async beforeMount() {
            await this.getDomainsList();
            this.changeBreadCrumbsList()
        },
        watch: {
            $route() {
                this.changeBreadCrumbsList()
            }
        }
    }
</script>

<style lang="scss">
    .main-container {
        background: rgb(243, 250, 255);
        min-height: 100%;

        header {
            width: 100%;

            .navigation-bg {
                width: 100%;
                background: #fff;
                box-shadow: 0px 4px 30px -4px rgba(0, 51, 90, 0.1);

                .navigation {
                    display: flex;
                    flex-direction: row;
                    margin: auto;
                    height: 80px;
                    width: 1400px;

                    .logo {
                        display: flex;
                        margin-top: 15px;
                        height: 50px;

                        img {
                            height: 50px;
                        }

                        p {
                            font: 23px/46px 'Open Sans', sans-serif;
                            color: #2d3639;
                        }
                    }

                    .logo:hover {
                        cursor: pointer;
                    }

                    .domains-list {
                        margin: 25px 0 0 40px;

                        .ant-select-selection {
                            border: none;
                            background: rgb(228, 240, 254);

                            .ant-select-selection__placeholder, .ant-select-arrow-icon {
                                color: rgba(61, 148, 251, 0.8);
                                font-family: 'Noto Sans', sans-serif;
                            }
                        }

                        .ant-select-focused .ant-select-selection, .ant-select-selection:focus, .ant-select-selection:active {
                            box-shadow: none;
                        }
                    }

                    .domains-list.active {
                        .ant-select-selection__placeholder {
                            color: rgba(61, 148, 251, 0.5);
                        }
                    }

                    .space {
                        flex-grow: 1;
                    }

                    .menu {
                        margin: 20px 0 0 10px;

                        ul {
                            display: flex;
                            list-style: none;

                            li {
                                margin: 0 2px;
                                padding: 9.5px;
                                border-radius: 4px;
                                font: 14px/22px 'Open Sans', sans-serif;
                                transition-duration: .3s;
                                color: rgba(61, 148, 251, 1);

                                i {
                                    font-size: 18px;
                                }
                            }

                            li:hover {
                                cursor: pointer;
                                transition: all 0.3s;
                                background-color: rgba(77, 89, 149, 0.06);
                            }
                        }
                    }
                }
            }

            .subheader {
                display: flex;
                width: 1400px;
                margin: 10px auto;
                padding: 10px 0;

                .ant-breadcrumb-link, .anticon {
                    font: 14px/1.2em 'Noto Sans', sans-serif;
                }
            }
        }
    }
</style>
