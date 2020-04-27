FROM jupyter/scipy-notebook:bca04790b492

ARG NB_USER=jovyan
ARG NB_UID=1000
ENV USER ${NB_USER}
ENV NB_UID ${NB_UID}
ENV HOME /home/${NB_USER}

USER root
RUN adduser --disabled-password \
	--gecos "Default user" \
	--uid ${NB_UID} \
	${NB_USER}

RUN mkdir -p ${HOME}/.jupyter/custom
RUN mv custom.js ${HOME}/.jupyter/custom/.

RUN jupyter notebook --generate-config
RUN mv jupyter_notebook_config.py ${HOME}/.jupyter/

RUN mkdir -p ${HOME}/api
RUN touch ${HOME}/api/__init__.py

RUN mv test.py ${HOME}/api/.
RUN mv evaluate/ ${HOME}/api/.
RUN mv assertion.py ${HOME}/api/.

RUN chown -R ${NB_UID} ${HOME}
USER ${NB_USER}
