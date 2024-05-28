nvm:
	. ${NVM_DIR}/nvm.sh && nvm use

front_deps:
	@make nvm
	@echo "Frontend dependencies"
	@cd web/front && npm install

front_build:
	@make nvm
	@echo "Building frontend"
	@cd web/front && npm run build

front_test:
	@make nvm
	@echo "Testing frontend"
	@cd web/front && npm run test

run:
	@echo "Running server"
	@go run cmd/go-books/main.go
