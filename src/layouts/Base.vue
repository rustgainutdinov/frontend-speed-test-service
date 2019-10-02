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
                                showSearch
                                placeholder="Выберите домен"
                                optionFilterProp="children"
                                style="width: 200px"
                                @focus="handleFocus"
                                @blur="handleBlur"
                                :filterOption="filterOption"
                        >
                            <a-select-option value="ispring"><router-link to="ispringsolutions.com">ispring.ru</router-link></a-select-option>
                            <a-select-option value="moneta">moneta.ru</a-select-option>
                            <a-select-option value="travelline">travelline.ru</a-select-option>
                            <a-select-option value="library">library.ispring.ru</a-select-option>
                            <a-select-option value="payfod">payfood.ispring.ru</a-select-option>
                            <a-select-option value="portal">portal.ispring.ru</a-select-option>
                        </a-select>
                    </div>
                    <div class="space">
                    </div>
                    <div class="menu">
                        <ul>
                            <!--                            <li>-->
                            <!--                                <a-badge count="5">-->
                            <!--                                    <a-icon type="bell"/>-->
                            <!--                                </a-badge>-->
                            <!--                            </li>-->
                            <li v-if="getPriority() >= 200">
                                <router-link :to="{path: '/user/admin-panel'}">
                                    <a-icon type="user"/>
                                </router-link>
                            </li>
                            <li>
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
                    <!--<a-breadcrumb-item href="">-->
                    <!--<a-icon type="home"/>-->
                    <!--<span> Главная</span>-->
                    <!--</a-breadcrumb-item>-->
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

    export default {
        name: "Base",
        data() {
            return {
                isSelectActive: false,
                breadcrumbs: []
            }
        },
        methods: {
            getPriority,
            handleBlur() {
                this.isSelectActive = false;
            },
            handleFocus() {
                this.isSelectActive = true;
            },
            filterOption(input, option) {
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
            }
        },
        beforeMount() {
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
